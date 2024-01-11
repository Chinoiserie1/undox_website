import { useQuery } from "react-query";
import { publicClient } from "@/components/walletConnect/publicClient";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useEffect, useState } from "react";

// const fetchCover1Supply = async () => {
//   const data = await publicClient.readContract({
//     address: process.env.NEXT_PUBLIC_CONTRACT,
//     abi: ABI.abi,
//     functionName: "getToken1Supply",
//   });
//   return Number(data);
// };

const useCover1Supply = () => {
  // return useQuery("cover1Supply", fetchCover1Supply);
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
    // const intervalId = setInterval(fetchData, 200000);
    // return () => clearInterval(intervalId);
  }, []);
  return { cover1Supply: balance };
};

export default useCover1Supply;
