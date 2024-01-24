import { useQuery } from "react-query";
import { publicClient } from "@/components/walletConnect/publicClient";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useEffect, useState } from "react";

const fetchTotalReservedCover = async () => {
  const data = await publicClient.readContract({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI.abi,
    functionName: "getTotalReservedCover",
  });
  return Number(data);
};

const useTotalReservedCover = () => {
  const { data } = useQuery("totalReservedCover", fetchTotalReservedCover);
  return { totalReserved: data };
  // const [balance, setBalance] = useState(0);
  // useEffect(() => {
  //   const fetchData = () => {
  //     publicClient
  //       .readContract({
  //         address: process.env.NEXT_PUBLIC_CONTRACT,
  //         abi: ABI.abi,
  //         functionName: "getTotalReservedCover",
  //       })
  //       .then((data) => {
  //         if (data) {
  //           setBalance(Number(data));
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   };
  //   fetchData();
  //   // const intervalId = setInterval(fetchData, 200000);
  //   // return () => clearInterval(intervalId);
  // }, []);
  // return { totalReserved: balance };
};

export default useTotalReservedCover;
