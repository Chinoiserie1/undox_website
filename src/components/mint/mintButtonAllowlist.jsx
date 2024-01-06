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

const MintButtonAllowlist = ({ userInfos }) => {
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
        <button
          className="w-1/2 px-4 py-2 text-white bg-ob-blackbg md:w-1/4 hover:bg-white hover:text-black hover:border hover:border-black"
          onClick={handleMint}
          disabled={disabledButton}
        >
          {isLoading ? "LOADING..." : "FREE MINT"}
        </button>
        {data?.hash && waitForTransaction.data?.status != "success" && (
          <p className="text-sm font-medium text-gray-900">
            Transaction submited :
            <a
              className="mt-1 text-sm text-gray-500 hover:underline"
              href={`${scanPath}${data?.hash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              click to see more
            </a>
          </p>
        )}
        {waitForTransaction.data?.status == "success" && (
          <p className="text-sm text-green-500">SUCCESSFULLY MINTED !</p>
        )}
      </div>
      {error && <p className="pt-1 text-xs text-center text-red-700">error</p>}
    </div>
  );
};

export default MintButtonAllowlist;
