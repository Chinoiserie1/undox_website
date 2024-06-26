import { useQuery } from "react-query";
import { publicClient } from "@/components/walletConnect/publicClient";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useEffect, useState } from "react";

const fetchReservedToken1 = async () => {
  const data = await publicClient.readContract({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI.abi,
    functionName: "cover1Reserved",
  });
  return Number(data);
};

const useReservedToken1 = () => {
  const { data } = useQuery("cover1Reserved", fetchReservedToken1);
  return { cover1Reserved: data };
  // const [balance, setBalance] = useState(0);
  // useEffect(() => {
  //   const fetchData = () => {
  //     publicClient
  //       .readContract({
  //         address: process.env.NEXT_PUBLIC_CONTRACT,
  //         abi: ABI.abi,
  //         functionName: "cover1Reserved",
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
  // return { cover1Reserved: balance };
};

export default useReservedToken1;
