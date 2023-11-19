import { useContractRead } from "wagmi";
import ABI from "@/app/contract/abi/UNDOXXED.json";

const useCurrentStatus = () => {
  const { data, error, isError } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI.abi,
    functionName: "getCurrentStatus",
    onError: (err) => {
      console.error(err);
    },
  });

  return { status: data, statusError: error, isStatusError: isError };
};

export default useCurrentStatus;
