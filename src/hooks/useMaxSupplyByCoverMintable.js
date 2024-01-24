import { useQuery } from "react-query";
import { publicClient } from "@/components/walletConnect/publicClient";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useEffect, useState } from "react";

const fetchMaxSupplyByCoverMintable = async () => {
  const data = await publicClient.readContract({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI.abi,
    functionName: "getMaxSupplyCover",
  });
  return Number(data);
};

const useMaxSupplyByCoverMintable = () => {
  const { data } = useQuery("maxSupplyByCover", fetchMaxSupplyByCoverMintable);
  return { maxSupplyCover: data };
  // const [balance, setBalance] = useState(0);
  // useEffect(() => {
  //   const fetchData = () => {
  //     publicClient
  //       .readContract({
  //         address: process.env.NEXT_PUBLIC_CONTRACT,
  //         abi: ABI.abi,
  //         functionName: "getMaxSupplyCover",
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
  // return { maxSupplyCover: balance };
};

export default useMaxSupplyByCoverMintable;
