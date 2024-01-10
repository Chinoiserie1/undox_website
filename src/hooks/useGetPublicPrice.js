import { useContractRead } from "wagmi";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useState, useEffect } from "react";

const useGetPublicPrice = () => {
  const [price, setPrice] = useState(0);
  const { data, isError, isLoading, error } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI.abi,
    // watch: true,
    functionName: "getPublicPrice",
    onError: (err) => {
      console.error(err);
    },
  });

  useEffect(() => {
    if (data) {
      setPrice(Number(data));
    }
  }, [data]);

  return {
    publicPrice: price,
    isErrorCover1: isError,
    isLoadingCover1: isLoading,
    errorCover1: error,
  };
};

export default useGetPublicPrice;
