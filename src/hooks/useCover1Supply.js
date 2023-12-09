import { publicClient } from "@/components/walletConnect/publicClient";
import { useContractReads } from "wagmi";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useEffect, useState } from "react";

const useCover1Supply = (address) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      publicClient
        .readContract({
          address: process.env.NEXT_PUBLIC_CONTRACT,
          abi: ABI.abi,
          functionName: "getToken1Supply",
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
  }, [address]);

  return { cover1Supply: balance };
};

export default useCover1Supply;
