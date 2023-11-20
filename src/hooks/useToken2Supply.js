import { useContractRead } from "wagmi";
import ABI from "@/app/contract/abi/UNDOXXED.json";

const useToken2Supply = () => {
  const { data, error, isError } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI.abi,
    functionName: "getToken2Supply",
    structuralSharing: (prev, next) => (prev === next ? prev : next),
    watch: true,
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    token2Supply: Number(data),
    token2SupplyError: error,
    isToken2SupplyError: isError,
  };
};

export default useToken2Supply;
