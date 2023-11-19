import { useState } from "react";
import { useAccount } from "wagmi";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import useCurrentStatus from "@/hooks/useCurrentStatus";
import checkUserWhitelisted from "./checkUserWhitelisted";
import MintSuccess from "./mintSuccess";
import TransactionSubmited from "./transactionSubmit";
import ErrorDialog from "./errorDialog";

const whitelistPrice = 0.001;
const publicPrice = 0.0015;

const statusList = {
  0: "Initialize",
  1: "allowlistMint",
  2: "whitelistMint",
  3: "mint",
  4: "End",
  5: "Pause",
};

const getFunctionName = (currentStatus) => {
  if (currentStatus === 1 || currentStatus === 2 || currentStatus === 3) {
    return statusList[currentStatus];
  } else return statusList[1];
};

const getMintValue = (status, quantityCover1, quantityCover2) => {
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

const buttonStyle =
  "w-1/2 px-4 py-2 text-white bg-black border border-white sm:w-1/4 hover:bg-white hover:text-black";

const MintButtonETH = ({ approveMint, quantityCover1, quantityCover2 }) => {
  const { address } = useAccount();
  const { status } = useCurrentStatus();
  const [errorMint, setErrorMint] = useState("");

  const { data, isLoading, isSuccess, isError, error, write } =
    useContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT,
      abi: ABI.abi,
      functionName: getFunctionName(status),
    });

  console.log("error :", error);

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleMint = () => {
    setErrorMint("");
    const res = checkUserWhitelisted(address, status);
    console.log(res);

    if (res.success) {
      console.log("AAAAAAAA");
      console.log(res);
      if (quantityCover1 == 0 && quantityCover2 == 0) {
        setErrorMint("Error can't mint zero quantity");
        return;
      }
      const value = getMintValue(res.status, quantityCover1, quantityCover2);

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
      if (status == 1) {
        setErrorMint("Error you are not allowlisted");
      } else if (status == 2) {
        setErrorMint("Error you are not whitelisted");
      } else if (status === 0) {
        setErrorMint("Sale not started");
      } else if (status === 4) {
        setErrorMint("Sale ended");
      } else if (status === 5) {
        setErrorMint("Sale paused");
      } else {
        setErrorMint("Error something went wrong");
      }
    }
  };

  return (
    <div className="flex justify-center pt-6">
      <button
        className="w-1/2 px-4 py-2 text-white bg-black border border-white sm:w-1/4 hover:bg-white hover:text-black"
        disabled={!approveMint}
        onClick={handleMint}
      >
        {isLoading ? "loading" : status == 1 ? "MINT" : "MINT with ETH"}
      </button>
      <TransactionSubmited success={data ? true : false} hash={data?.hash} />
      <MintSuccess success={waitForTransaction.data?.status == "success"} />
      {errorMint && (
        <ErrorDialog
          errorMessage={errorMint}
          onClose={() => setErrorMint("")}
        />
      )}
    </div>
  );
};

export default MintButtonETH;
