import { useContractRead } from "wagmi";
import ABI from "@/app/contract/abi/UNDOXXED.json";

const useToken1Supply = () => {
  const { data, error, isError } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI.abi,
    functionName: "getToken1Supply",
    structuralSharing: (prev, next) => (prev === next ? prev : next),
    watch: true,
    onError: (err) => {
      console.error(err);
    },
  });

  return {
    token1Supply: Number(data),
    token1SupplyError: error,
    isToken1SupplyError: isError,
  };
};

export default useToken1Supply;
