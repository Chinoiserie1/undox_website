import { useContractRead } from "wagmi";
import { useAccount } from "wagmi";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useState, useEffect } from "react";

const useGetBalanceCover2 = () => {
  const { address } = useAccount();
  const [balance, setBalance] = useState(0);
  const { data, isError, isLoading, error } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI.abi,
    watch: true,
    functionName: "getBalanceOfCover2",
    args: [address],
    onError: (err) => {
      console.error(err);
    },
  });

  useEffect(() => {
    if (data) {
      setBalance(Number(data));
    }
  }, [data]);

  return {
    dataCover2: balance,
    isErrorCover2: isError,
    isLoadingCover2: isLoading,
    errorCover2: error,
  };
};

export default useGetBalanceCover2;
