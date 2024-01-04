import { useState } from "react";
import { useAccount } from "wagmi";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { parseEther } from "viem";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import useCurrentStatus from "@/hooks/useCurrentStatus";
import { storeMintClick } from "@/app/api/storeMintClick";
import checkUserWhitelisted, { isWhitelisted } from "./checkUserWhitelisted";
import MintSuccess from "./mintSuccess";
import TransactionSubmited from "./transactionSubmit";
import ErrorDialog from "./errorDialog";
import getFunctionName from "@/utils/getFunctionName";
import getMintValue from "@/utils/getMintValue";
import MintSuccessDialog from "./mintSuccessDialog";
import useWalletBalance from "@/hooks/useWalletBalance";

const buttonStyle =
  "w-1/2 px-4 py-2 text-white bg-black border border-white md:w-1/4 hover:bg-white hover:text-black";

const MintButtonETH = ({
  approveMint,
  quantityCover1,
  quantityCover2,
  allQuantityMinted,
  errorUserNotWhitelisted,
}) => {
  const { address } = useAccount();
  const { status } = useCurrentStatus();
  const [errorMint, setErrorMint] = useState("");
  const [disabledButton, setDisableButton] = useState(false);
  const balance = useWalletBalance(address);

  const { data, isLoading, isSuccess, isError, error, write } =
    useContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT,
      abi: ABI.abi,
      functionName: getFunctionName(
        status,
        isWhitelisted(address).isWhitelisted
      ),
    });

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
  });

  if (isError && error && !errorMint) {
    const pattern = /Error: ([^(]+)/;
    const patternNoError =
      /TransactionExecutionError: User rejected the request./;
    const matchNoError = error.toString().match(pattern);
    const match = error.toString().match(pattern);
    const capturedMessage = match ? match[1].trim() : "Error message not found";
    if (!matchNoError) {
      setErrorMint(capturedMessage);
    }
  }

  const handleMint = () => {
    setErrorMint("");
    // setDisableButton(true);
    const res = checkUserWhitelisted(address, status);

    const value = getMintValue(
      res.status,
      quantityCover1,
      quantityCover2,
      isWhitelisted(address).isWhitelisted
    );

    if (balance.value < parseEther(value.toString())) {
      setErrorMint("This transaction exceeds the balance of the account.");
      return;
    }

    if (res.success) {
      if (quantityCover1 == 0 && quantityCover2 == 0) {
        setErrorMint("Error can't mint zero quantity");
        return;
      }

      storeMintClick({
        ETHAddress: address,
        cover1: quantityCover1,
        cover2: quantityCover2,
      });

      write({
        args: [
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

  if (isLoading && !disabledButton) setDisableButton(true);
  if (!isLoading && disabledButton) setDisableButton(false);

  if (status === 0) {
    return (
      <div className="flex justify-center pt-6">
        <div className="w-1/2 px-4 py-2 text-center text-white border border-white bg-ob-blackbg md:w-1/4">
          Sale not started
        </div>
      </div>
    );
  }

  if (status === 4) {
    return (
      <div className="flex justify-center pt-6">
        <div className="w-1/2 px-4 py-2 text-center text-white border border-white bg-ob-blackbg md:w-1/4">
          Sale ended
        </div>
      </div>
    );
  }

  if (status === 5) {
    return (
      <div className="flex justify-center pt-6">
        <div className="w-1/2 px-4 py-2 text-center text-white border border-white bg-ob-blackbg md:w-1/4">
          Sale paused
        </div>
      </div>
    );
  }

  if (errorUserNotWhitelisted) {
    return (
      <div className="flex justify-center pt-6">
        <div className="w-1/2 px-4 py-2 text-center text-red-600 border border-white bg-ob-blackbg md:w-1/4">
          {errorUserNotWhitelisted}
        </div>
      </div>
    );
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

  return (
    <div className="flex justify-center pt-6">
      <button
        className="w-1/2 px-4 py-2 text-white border border-white bg-ob-blackbg md:w-1/4 hover:bg-white hover:text-black"
        disabled={!approveMint || disabledButton}
        onClick={handleMint}
      >
        {isLoading ? "loading" : status == 1 ? "MINT" : "MINT"}
      </button>
      <TransactionSubmited success={data ? true : false} hash={data?.hash} />
      {/* <MintSuccess success={waitForTransaction.data?.status == "success"} /> */}
      {waitForTransaction.data?.status == "success" && (
        <MintSuccessDialog hash={data?.hash} />
      )}
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
