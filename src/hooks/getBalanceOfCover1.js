import { useContractRead } from "wagmi";
import { useAccount } from "wagmi";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useState, useEffect } from "react";

const useGetBalanceCover1 = () => {
  const { address } = useAccount();
  const { data, isError, isLoading, error } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI.abi,
    functionName: "getBalanceOfCover1",
    args: [address],
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    dataCover1: Number(data),
    isErrorCover1: isError,
    isLoadingCover1: isLoading,
    errorCover1: error,
  };
};

export default useGetBalanceCover1;
