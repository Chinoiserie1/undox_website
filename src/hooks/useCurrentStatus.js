import { useContractRead } from "wagmi";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useEffect, useState } from "react";

const useCurrentStatus = () => {
  const [status, setStatus] = useState(0);
  const { data, error, isError } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI.abi,
    functionName: "getCurrentStatus",
    onError: (err) => {
      console.error(err);
    },
  });

  useEffect(() => {
    if (data) {
      setStatus(Number(data));
    }
  }, [data]);

  return { status: status, statusError: error, isStatusError: isError };
};

export default useCurrentStatus;
