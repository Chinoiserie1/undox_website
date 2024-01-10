import { useContractRead } from "wagmi";
import { useAccount } from "wagmi";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useState, useEffect } from "react";

const useBalanceMintBySign = (signature) => {
  const [balanceCover1, setBalanceCover1] = useState(0);
  const [balanceCover2, setBalanceCover2] = useState(0);
  const { data, isError, isLoading, error } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI.abi,
    // watch: true,
    functionName: "getBalanceMintBySign",
    args: [signature],
    onError: (err) => {
      console.error(err);
    },
  });

  useEffect(() => {
    if (data?.length == 2) {
      setBalanceCover1(Number(data[0]));
      setBalanceCover2(Number(data[1]));
    }
  }, [data]);

  return {
    dataCover1: balanceCover1,
    dataCover2: balanceCover2,
    isError: isError,
    isLoading: isLoading,
    error: error,
  };
};

export default useBalanceMintBySign;
