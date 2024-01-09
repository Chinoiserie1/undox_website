import { publicClient } from "@/components/walletConnect/publicClient";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useEffect, useState } from "react";

const useTotalReservedCover = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      publicClient
        .readContract({
          address: process.env.NEXT_PUBLIC_CONTRACT,
          abi: ABI.abi,
          functionName: "getTotalReservedCover",
        })
        .then((data) => {
          if (data) {
            setBalance(Number(data));
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();

    const intervalId = setInterval(fetchData, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return { totalReserved: balance };
};

export default useTotalReservedCover;