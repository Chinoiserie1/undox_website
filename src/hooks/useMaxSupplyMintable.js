import { useQuery } from "react-query";
import { publicClient } from "@/components/walletConnect/publicClient";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useEffect, useState } from "react";

const fetchMaxSupplyMintable = async () => {
  const data = await publicClient.readContract({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI.abi,
    functionName: "getMaxSupply",
  });
  return Number(data);
};

const useMaxSupplyMintable = () => {
  const { data } = useQuery("maxSupply", fetchMaxSupplyMintable);
  return { maxSupply: data };
  // const [balance, setBalance] = useState(0);
  // useEffect(() => {
  //   const fetchData = () => {
  //     publicClient
  //       .readContract({
  //         address: process.env.NEXT_PUBLIC_CONTRACT,
  //         abi: ABI.abi,
  //         functionName: "getMaxSupply",
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
  // return { maxSupply: balance };
};

export default useMaxSupplyMintable;
