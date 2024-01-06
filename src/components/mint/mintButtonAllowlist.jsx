import { useContractWrite, useWaitForTransaction, useAccount } from "wagmi";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import getMintValue from "@/utils/getMintValue";
import { parseEther } from "viem";

import MintSuccessDialog from "./mintSuccessDialog";
import TransactionSubmited from "./transactionSubmit";
import { useEffect, useState } from "react";

const etherscanPath = "https://etherscan.io/tx/";
const goerliscanPath = "https://goerli.etherscan.io/tx/";
const scanPath =
  process.env.NEXT_PUBLIC_CHAIN == 1 ? etherscanPath : goerliscanPath;

const MintButtonAllowlist = ({ userInfos, handleClose }) => {
  const { address } = useAccount();

  const [disabledButton, setDisableButton] = useState(false);

  const { data, isLoading, isSuccess, isError, error, write } =
    useContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT,
      abi: ABI.abi,
      functionName: "allowlistMint",
    });

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleMint = () => {
    // setDisableButton(true);
    write({
      args: [
        userInfos.cover1,
        userInfos.cover2,
        userInfos.cover1,
        userInfos.cover2,
        userInfos.signature,
      ],
    });
  };

  if (isLoading && !disabledButton) setDisableButton(true);
  if (!isLoading && disabledButton) setDisableButton(false);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center pt-6">
        {!isSuccess && (
          <button
            className="w-1/2 px-4 py-2 text-white bg-ob-blackbg md:w-1/4 hover:bg-white hover:text-black hover:border hover:border-black"
            onClick={handleMint}
            disabled={disabledButton}
          >
            {isLoading ? "LOADING..." : "FREE MINT"}
          </button>
        )}
      </div>
      <div className="flex flex-col items-center justify-center">
        {data?.hash && waitForTransaction.data?.status != "success" && (
          <div className="items-center justify-center">
            <p className="pt-2 text-green-600 uppercase">
              Transaction submited.
            </p>
            <p className="pt-2 text-sm font-medium text-red-700">
              Please wait for the transaction to process, don
              <span className="font-arial">{"'"}</span>t close or reload the
              page.
            </p>
          </div>
        )}
        {waitForTransaction.data?.status == "success" && (
          <p className="pt-2 text-sm text-green-600">
            SUCCESSFULLY MINTED <span className="font-arial">!</span>
          </p>
        )}
        {waitForTransaction.data?.status == "success" && (
          <button
            className="w-1/2 px-4 py-2 text-white bg-ob-blackbg md:w-1/4 hover:bg-white hover:text-black hover:border hover:border-black"
            onClick={handleClose}
          >
            CLOSE
          </button>
        )}
        {error && (
          <p className="pt-1 text-xs text-center text-red-700">error</p>
        )}
      </div>
    </div>
  );
};

export default MintButtonAllowlist;
