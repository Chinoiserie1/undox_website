import { useContractWrite, useWaitForTransaction, useAccount } from "wagmi";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import getMintValue from "@/utils/getMintValue";
import { parseEther, formatEther } from "viem";

import MintSuccessDialog from "./mintSuccessDialog";
import TransactionSubmited from "./transactionSubmit";
import { useState } from "react";

import useWalletBalance from "@/hooks/useWalletBalance";

const etherscanPath = "https://etherscan.io/tx/";
const goerliscanPath = "https://goerli.etherscan.io/tx/";
const scanPath =
  process.env.NEXT_PUBLIC_CHAIN == 1 ? etherscanPath : goerliscanPath;

const MintButtonPrivate = ({ userInfos, handleClose }) => {
  const { address } = useAccount();
  const userBalance = useWalletBalance(address);
  const [errorPrivate, setErrorPrivate] = useState("");

  const [disabledButton, setDisableButton] = useState(false);

  const value = getMintValue(2, userInfos?.cover1, userInfos?.cover2, true);

  const { data, isLoading, isSuccess, isError, error, write } =
    useContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT,
      abi: ABI.abi,
      functionName: "privateWhitelistMint",
    });

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleMint = () => {
    if (formatEther(userBalance.toString()) < value && errorPrivate == "") {
      setErrorPrivate("Error: not enougth funds.");
      return;
    }

    write({
      args: [
        userInfos.cover1,
        userInfos.cover2,
        userInfos.cover1,
        userInfos.cover2,
        userInfos.signature,
      ],
      value: parseEther(value.toString()),
    });
  };

  if (isLoading && !disabledButton) setDisableButton(true);
  if (!isLoading && disabledButton) setDisableButton(false);

  if (error && errorPrivate == "") {
    setErrorPrivate("Error: something went wrong.");
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-center pt-6">
        <button
          className="w-1/2 px-4 py-2 text-white bg-ob-blackbg md:w-1/4 hover:bg-white hover:text-black hover:border hover:border-black"
          onClick={handleMint}
          disabled={disabledButton}
        >
          MINT
        </button>
      </div>
      {data?.hash && waitForTransaction.data?.status != "success" && (
        <p className="justify-center pt-2 text-sm font-medium text-gray-900">
          {
            "Transaction submited: Please wait for the transaction to process, don't close or reload the page."
          }
        </p>
      )}
      <div className="flex flex-col justify-center">
        {waitForTransaction.data?.status == "success" && (
          <p className="justify-center pt-2 text-sm text-green-500">
            SUCCESSFULLY MINTED <span className="font-arial">!</span>
          </p>
        )}
        {waitForTransaction.data?.status == "success" && (
          <button
            className="justify-center w-1/2 px-4 py-2 text-white bg-ob-blackbg md:w-1/4 hover:bg-white hover:text-black hover:border hover:border-black"
            onClick={handleClose}
          >
            CLOSE
          </button>
        )}
        {errorPrivate != "" && (
          <p className="justify-center pt-2 text-xs text-center text-red-700">
            {errorPrivate}
          </p>
        )}
      </div>
    </div>
  );
};

export default MintButtonPrivate;
