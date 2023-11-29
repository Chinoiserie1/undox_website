import { useContractRead } from "wagmi";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useEffect, useState } from "react";

const useToken2Supply = () => {
  const [token2Supply, setToken2Supply] = useState(0);
  const { data, error, isError, isFetching } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI.abi,
    functionName: "getToken2Supply",
    structuralSharing: (prev, next) => (prev === next ? prev : next),
    watch: true,
    onError: (err) => {
      console.error(err);
    },
  });

  useEffect(() => {
    if (data) {
      setToken2Supply(Number(data));
    }
  }, [data]);

  return {
    token2Supply: token2Supply,
    token2SupplyError: error,
    isToken2SupplyError: isError,
    isToken2Fetching: isFetching,
  };
};

export default useToken2Supply;
