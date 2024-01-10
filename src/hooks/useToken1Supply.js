import { useContractRead } from "wagmi";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useEffect, useState } from "react";

const useToken1Supply = () => {
  const [token1Supply, setToken1Supply] = useState(0);
  const { data, error, isError, isFetching } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI.abi,
    functionName: "getToken1Supply",
    structuralSharing: (prev, next) => (prev === next ? prev : next),
    // watch: true,
    onError: (err) => {
      console.error(err);
    },
  });

  useEffect(() => {
    if (data) {
      setToken1Supply(Number(data));
    }
  }, [data]);

  return {
    token1Supply: token1Supply,
    token1SupplyError: error,
    isToken1SupplyError: isError,
    isToken1Fetching: isFetching,
  };
};

export default useToken1Supply;
