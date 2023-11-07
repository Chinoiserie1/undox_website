import { useState, useEffect } from "react";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { parseEther } from "viem";

import { getShippingInfo } from "@/app/api/getShippingInfo";
import { storeMintClick } from "@/app/api/storeMintClick";
import { CheckoutWithCard } from "@paperxyz/react-client-sdk";

import checkUserWhitelisted from "./checkUserWhitelisted";
import Divider from "../separator";
import Form from "./form";
import Remaining from "./remaining";
import FiatPayment from "./fiatPayment";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import MintSuccess from "./mintSuccess";
import TransactionSubmited from "./transactionSubmit";
import Cover1 from "./cover1";
import Cover2 from "./cover2";
import ErrorDialog from "./errorDialog";
import ErrorNotification from "./errorNotification";

const whitelistPrice = 0.001;
const publicPrice = 0.0015;

const status = {
  0: "Initialize",
  1: "allowlistMint",
  2: "whitelistMint",
  3: "mint",
  4: "End",
  5: "Pause",
};

const MintPart2 = ({ address, approveMint, currentStatus }) => {
  const [isUserWhitelist, setIsUserWhitelist] = useState(false);
  const [errorUserNotWhitelist, setErrorUserNotWhitelist] = useState("");

  const [quantityCover1, setQuantityCover1] = useState(0);
  const [quantityCover2, setQuantityCover2] = useState(0);

  const [errorMint, setErrorMint] = useState("");

  const getFunctionName = () => {
    if (currentStatus === 1 || currentStatus === 2 || currentStatus === 3) {
      return status[currentStatus];
    } else return status[1];
  };

  const { data, isLoading, isSuccess, isError, error, write } =
    useContractWrite({
      address: "0x2D308A424474E2632a7cc10C9A6791F3f1B7192f",
      abi: ABI.abi,
      functionName: getFunctionName(),
    });

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
  });

  const getMintValue = (status) => {
    if (status == 1) {
      return 0;
    }
    if (status == 2) {
      return (quantityCover1 + quantityCover2) * whitelistPrice;
    }
    if (status == 3) {
      return (quantityCover1 + quantityCover2) * publicPrice;
    }
    return 0;
  };

  const getMintInfos = () => {
    const res = checkUserWhitelisted(address, currentStatus);

    const value = getMintValue(currentStatus);

    return {
      address: address,
      quantityCover1: quantityCover1,
      quantityCover2: quantityCover2,
      value: value,
      ...res,
    };
  };

  const handleMint = () => {
    setErrorMint("");
    const res = checkUserWhitelisted(address, currentStatus);
    if (res.success) {
      console.log("AAAAAAAA");
      console.log(res);
      if (quantityCover1 == 0 && quantityCover2 == 0) {
        setErrorMint("Error can't mint zero quantity");
        return;
      }
      const value = getMintValue(res.status);

      storeMintClick({
        ETHAddress: address,
        cover1: quantityCover1,
        cover2: quantityCover2,
      });

      write({
        args: [
          address,
          quantityCover1,
          quantityCover2,
          res.cover1,
          res.cover2,
          res.signature,
        ],
        value: parseEther(value.toString()),
      });
    } else {
      if (currentStatus == 1) {
        setErrorMint("Error you are not allowlisted");
      } else if (currentStatus == 2) {
        setErrorMint("Error you are not whitelisted");
      } else {
        setErrorMint("Error something went wrong");
      }
    }
  };

  useEffect(() => {
    setErrorMint("");
    if (isError) {
      setErrorMint("Something went wrong");
      console.log(error);
    }
  }, [isError, error]);

  useEffect(() => {
    const res = checkUserWhitelisted(address, currentStatus);
    if (res.success) {
      setIsUserWhitelist(true);
    } else {
      setIsUserWhitelist(false);
    }
  }, [address, currentStatus]);

  useEffect(() => {
    if (!isUserWhitelist) {
      if (currentStatus == 1) {
        setErrorUserNotWhitelist("You are not Allowlisted");
      } else if (currentStatus == 2) {
        setErrorUserNotWhitelist("You are not Whitelisted");
      } else {
        setErrorUserNotWhitelist("");
      }
    } else {
      setErrorUserNotWhitelist("");
    }
  }, [isUserWhitelist, currentStatus]);

  return (
    <div>
      <div className={!approveMint ? "opacity-50" : ""}>
        <div className="px-4 py-5 text-base sm:p-6">
          <p>Step 2: Mint your NFT</p>
          <p className="pt-4">
            We are thrilled to announce an exciting opportunity to showcase your
            artistic skills and make a lasting impact on the upcoming book
            “UNDOXXED” – a captivating exploration of “The Finest in Digital
            Lifestyle Culture”. We are seeking a captivating and visually
            striking design that encapsulates the essence of “UNDOXXED” and its
            exploration of digital culture for the cover, spine, and back of the
            book. This is an exceptional opportunity to leave your artistic
            imprint on a significant publication that will resonate with
            enthusiasts worldwide.
          </p>
          <div className="pt-6">
            <Remaining />
          </div>
          {/* Mint button */}
          <div className="flex flex-col w-full pt-6 sm:flex-row">
            <Cover1
              approveMint={approveMint}
              setQuantityCover1={setQuantityCover1}
            />
            <div className="pt-4 sm:pt-0" />
            <Cover2
              approveMint={approveMint}
              setQuantityCover2={setQuantityCover2}
            />
          </div>
          <div className="flex justify-center pt-6">
            <button
              className="w-1/2 px-4 py-2 text-white bg-black border border-white sm:w-1/4 hover:bg-white hover:text-black"
              disabled={!approveMint}
              onClick={handleMint}
            >
              {isLoading
                ? "loading"
                : currentStatus == 1
                ? "MINT"
                : "MINT with ETH"}
            </button>
          </div>
          {(currentStatus == 2 || currentStatus == 3) && (
            <FiatPayment approveMint={approveMint} mintInfos={getMintInfos()} />
          )}
          {errorMint && (
            <ErrorDialog
              errorMessage={errorMint}
              onClose={() => setErrorMint("")}
            />
          )}
          {errorUserNotWhitelist && (
            <ErrorNotification
              success={true}
              titleMessage={"Warning :"}
              message={errorUserNotWhitelist}
            />
          )}
          <TransactionSubmited
            success={data ? true : false}
            hash={data?.hash}
          />
          <MintSuccess success={waitForTransaction.data?.status == "success"} />
        </div>
      </div>
    </div>
  );
};

export default MintPart2;
