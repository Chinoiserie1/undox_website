import { useState, useEffect } from "react";
import { useContractWrite } from "wagmi";
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

const etherscanPath = "https://etherscan.io/tx/";
const goerliscanPath = "https://goerli.etherscan.io/tx/";

const cover1 = "/images/book/UNDX_FLIP_A.jpg";
const cover2 = "/images/cover2/UNDX_FLIP_B.jpg";

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
  const [quantityCover1, setQuantityCover1] = useState(0);
  const [quantityCover2, setQuantityCover2] = useState(0);

  const [errorMint, setErrorMint] = useState("");

  const getFunctionName = () => {
    if (currentStatus === 1 || currentStatus === 2 || currentStatus === 3) {
      return status[currentStatus];
    } else return status[1];
  };

  const { data, isLoading, isSuccess, isError, write } = useContractWrite({
    address: "0x2D308A424474E2632a7cc10C9A6791F3f1B7192f",
    abi: ABI.abi,
    functionName: getFunctionName(),
  });

  // const checkUserWhitelisted = () => {
  //   let res = {
  //     success: false,
  //     status: 0,
  //     signature: "",
  //     cover1: 0,
  //     cover2: 0,
  //   };
  //   switch (currentStatus) {
  //     case 1:
  //       const allowlist = Whitelist.allowlist;
  //       for (let i = 0; i < allowlist.length; i++) {
  //         if (allowlist[i].address == address) {
  //           res.success = true;
  //           res.status = currentStatus;
  //           res.signature = allowlist[i].signature;
  //           res.cover1 = allowlist[i].amountCover1;
  //           res.cover2 = allowlist[i].amountCover1;
  //           return res;
  //         }
  //       }
  //       return res;
  //     case 2:
  //       const whitelist = Whitelist.whitelist;
  //       for (let i = 0; i < whitelist.length; i++) {
  //         if (whitelist[i].address == address) {
  //           res.success = true;
  //           res.status = currentStatus;
  //           res.signature = whitelist[i].signature;
  //           res.cover1 = whitelist[i].amountCover1;
  //           res.cover2 = whitelist[i].amountCover1;
  //         }
  //       }
  //       return res;
  //     case 3:
  //       res.success = true;
  //       res.status = currentStatus;
  //       res.signature = "";
  //       res.cover1 = 0;
  //       res.cover2 = 0;
  //       return res;
  //     default:
  //       return res;
  //   }
  // };

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

  const handleQuantityChangeCover1 = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantityCover1(newQuantity);
    }
  };

  const handleQuantityChangeCover2 = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantityCover2(newQuantity);
    }
  };

  const handleMint = () => {
    setErrorMint("");
    const res = checkUserWhitelisted(address, currentStatus);
    console.log(res);
    if (res.success) {
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
      }
      if (currentStatus == 2) {
        setErrorMint("Error you are not whitelisted");
      }
      setErrorMint("Error something went wrong");
    }
  };

  useEffect(() => {
    setErrorMint("");
    if (isError) {
      setErrorMint("Something went wrong");
    }
  }, [isError]);

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
            <div className="w-full sm:w-1/2">
              <div className="px-4 py-5 sm:p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cover1} alt="Cover1" />
              </div>
              <label className="mr-2 text-white">Cover 1:</label>
              <select
                id="Cover 1"
                value={quantityCover1}
                onChange={handleQuantityChangeCover1}
                disabled={!approveMint}
                className="w-16 px-2 py-1 text-white bg-black border border-white"
              >
                <option>0</option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
            <div className="pt-4 sm:pt-0"></div>
            <div className="w-full sm:w-1/2">
              {/* insert image cover 2 */}
              <div className="px-4 py-5 sm:p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cover2} alt="Cover2" />
              </div>
              <label className="mr-2 text-white ">Cover 2:</label>
              <select
                id="Cover 2"
                value={quantityCover2}
                onChange={handleQuantityChangeCover2}
                disabled={!approveMint}
                className="w-16 px-2 py-1 text-white bg-black border border-white"
              >
                <option>0</option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
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
          {currentStatus == 2 ||
            (currentStatus == 2 && (
              <FiatPayment
                approveMint={approveMint}
                mintInfos={getMintInfos()}
              />
            ))}
          {errorMint && (
            <div className="flex justify-center pt-4">
              <div className="text-red-700">{errorMint}</div>
            </div>
          )}
          {data && (
            <div className="flex justify-center pt-4">
              <a
                href={`${etherscanPath}${data.hash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Transaction submited : click to see more
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MintPart2;
