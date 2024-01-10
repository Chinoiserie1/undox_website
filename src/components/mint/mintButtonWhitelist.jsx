import { useState } from "react";
import { useAccount } from "wagmi";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { parseEther, formatEther } from "viem";

import MintSuccess from "./mintSuccess";
import TransactionSubmited from "./transactionSubmit";
import ErrorDialog from "./errorDialog";
import MintSuccessDialog from "./mintSuccessDialog";
import getMintValue from "@/utils/getMintValue";

import ABI from "@/app/contract/abi/UNDOXXED.json";

import { isWhitelisted } from "@/components/mint/checkUserWhitelisted";

import useWalletBalance from "@/hooks/useWalletBalance";
import useBalanceMintBySign from "@/hooks/useBalanceMintBySign";

const MintButtonWhitelist = ({
  approveMint,
  quantityCover1,
  quantityCover2,
  allQuantityMinted,
}) => {
  const { address } = useAccount();
  const [errorMint, setErrorMint] = useState("");
  const [disabledButton, setDisableButton] = useState(false);

  const whitelistInfos = isWhitelisted(address);

  const { dataCover1, dataCover2 } = useBalanceMintBySign(
    whitelistInfos.signature
  );

  const balance = useWalletBalance(address);

  const { data, isLoading, isSuccess, isError, error, write } =
    useContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT,
      abi: ABI.abi,
      functionName: "whitelistMint",
    });

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
  });

  const value = getMintValue(2, quantityCover1, quantityCover2);

  console.log(approveMint);

  const handleMint = () => {
    if (formatEther(balance) < value) {
      setErrorMint("Error: Not enougth funds.");
      return;
    }

    write({
      args: [
        quantityCover1,
        quantityCover2,
        whitelistInfos.cover1,
        whitelistInfos.cover2,
        whitelistInfos.signature,
      ],
      value: parseEther(value.toString()),
    });
  };

  if (isError && errorMint == "") {
    setErrorMint("Error something went wrong");
  }

  if (allQuantityMinted) {
    return (
      <div className="flex justify-center pt-6">
        <div className="w-1/2 px-4 py-8 text-4xl text-center text-white border border-white bg-ob-blackbg md:w-1/4">
          Sold Out
        </div>
      </div>
    );
  }

  if (dataCover1 + quantityCover1 > 10) {
    return (
      <div className="flex justify-center pt-6">
        <div className="w-1/2 px-4 py-8 text-4xl text-center text-white border border-white bg-ob-blackbg md:w-1/4">
          Already max Mint cover1
        </div>
      </div>
    );
  }

  if (dataCover2 + quantityCover2 > 10) {
    return (
      <div className="flex justify-center pt-6">
        <div className="w-1/2 px-4 py-8 text-4xl text-center text-white border border-white bg-ob-blackbg md:w-1/4">
          Already max Mint cover2
        </div>
      </div>
    );
  }

  if (isLoading && !disabledButton) setDisableButton(true);
  if (!isLoading && disabledButton) setDisableButton(false);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center pt-6">
        <button
          className="w-1/2 px-4 py-8 text-4xl font-extrabold text-white border border-white bg-ob-blackbg md:w-1/4 hover:bg-white hover:text-black"
          disabled={disabledButton || !whitelistInfos.isWhitelisted}
          onClick={handleMint}
        >
          {isLoading ? "loading" : status == 1 ? "MINT" : "MINT"}
        </button>
        <TransactionSubmited success={data ? true : false} hash={data?.hash} />
        {waitForTransaction.data?.status == "success" && (
          <MintSuccessDialog hash={data?.hash} />
        )}
      </div>
      {errorMint && (
        <p className="pt-2 text-center text-red-700">{errorMint}</p>
      )}
    </div>
  );
};

export default MintButtonWhitelist;
