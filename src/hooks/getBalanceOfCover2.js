import { useContractRead } from "wagmi";
import { useAccount } from "wagmi";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useState, useEffect } from "react";

const useGetBalanceCover2 = () => {
  const { address } = useAccount();
  const { data, isError, isLoading, error } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI.abi,
    functionName: "getBalanceOfCover2",
    args: [address],
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    dataCover2: data ? Number(data) : data,
    isErrorCover2: isError,
    isLoadingCover2: isLoading,
    errorCover2: error,
  };
};

export default useGetBalanceCover2;
