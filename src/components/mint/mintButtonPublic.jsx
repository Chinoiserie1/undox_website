import { useState } from "react";
import { useAccount } from "wagmi";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { parseEther } from "viem";

import MintSuccess from "./mintSuccess";
import TransactionSubmited from "./transactionSubmit";
import ErrorDialog from "./errorDialog";
import MintSuccessDialog from "./mintSuccessDialog";
import getMintValue from "@/utils/getMintValue";

import ABI from "@/app/contract/abi/UNDOXXED.json";

import useWalletBalance from "@/hooks/useWalletBalance";
import useCurrentStatus from "@/hooks/useCurrentStatus";

const MintButtonPublic = ({
  approveMint,
  quantityCover1,
  quantityCover2,
  allQuantityMinted,
}) => {
  const { address } = useAccount();
  const [errorMint, setErrorMint] = useState("");
  const [disabledButton, setDisableButton] = useState(false);

  const balance = useWalletBalance(address);
  const { status } = useCurrentStatus();

  const { data, isLoading, isSuccess, isError, error, write } =
    useContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT,
      abi: ABI.abi,
      functionName: "mint",
    });

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
  });

  const value = getMintValue(3, quantityCover1, quantityCover2);

  const handleMint = () => {
    write({
      args: [quantityCover1, quantityCover2],
      value: parseEther(value.toString()),
    });
  };

  if (error == "" && balance < value) {
    setErrorMint("Error: not enougth funds.");
  }

  if (isError && error == "") {
    setErrorMint("Error something went wrong.");
  }

  if (allQuantityMinted) {
    return (
      <div className="flex justify-center pt-6">
        <div className="w-1/2 px-4 py-2 text-center text-white border border-white bg-ob-blackbg md:w-1/4">
          Sold out
        </div>
      </div>
    );
  }

  if (isLoading && !disabledButton) setDisableButton(true);
  if (!isLoading && disabledButton) setDisableButton(false);

  return (
    <div className="flex justify-center pt-6">
      <button
        className="w-1/2 px-4 py-2 text-white border border-white bg-ob-blackbg md:w-1/4 hover:bg-white hover:text-black"
        disabled={!approveMint || disabledButton || status == 2}
        onClick={handleMint}
      >
        {isLoading ? "loading" : status == 1 ? "MINT" : "MINT"}
      </button>
      <TransactionSubmited success={data ? true : false} hash={data?.hash} />
      {waitForTransaction.data?.status == "success" && (
        <MintSuccessDialog hash={data?.hash} />
      )}
      {/* {errorMint && (
        <ErrorDialog
          errorMessage={errorMint}
          onClose={() => setErrorMint("")}
        />
      )} */}
      {errorMint != "" && (
        <p className="pt-2 text-xs text-center text-red-700">{errorMint}</p>
      )}
    </div>
  );
};

export default MintButtonPublic;
