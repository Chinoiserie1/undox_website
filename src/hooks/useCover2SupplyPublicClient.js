import { useQuery } from "react-query";
import { publicClient } from "@/components/walletConnect/publicClient";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useEffect, useState } from "react";

const fetchCover2Supply = async () => {
  const data = await publicClient.readContract({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI.abi,
    functionName: "getToken2Supply",
  });
  return Number(data);
};

const useCover2Supply = () => {
  const querie = useQuery("cover2Supply", fetchCover2Supply);
  return { cover2Supply: querie.isSuccess ? querie.data : 0 };
  // const [balance, setBalance] = useState(0);

  // useEffect(() => {
  //   const fetchData = () => {
  //     publicClient
  //       .readContract({
  //         address: process.env.NEXT_PUBLIC_CONTRACT,
  //         abi: ABI.abi,
  //         functionName: "getToken2Supply",
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

  // return { cover2Supply: balance };
};

export default useCover2Supply;
