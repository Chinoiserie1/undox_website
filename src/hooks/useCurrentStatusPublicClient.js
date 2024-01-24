import { useQuery } from "react-query";
import { publicClient } from "@/components/walletConnect/publicClient";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useEffect, useState } from "react";

const fetchCurrentStatus = async () => {
  const data = await publicClient.readContract({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI.abi,
    functionName: "getToken1Supply",
  });
  return data;
};

const useCurrentStatus = () => {
  const { data } = useQuery("currentStatus", fetchCurrentStatus);
  const status = data ? 3 : 2;
  return { currentStatus: status };
  // const [status, setstatus] = useState(0);
  // useEffect(() => {
  //   const fetchData = () => {
  //     publicClient
  //       .readContract({
  //         address: process.env.NEXT_PUBLIC_CONTRACT,
  //         abi: ABI.abi,
  //         functionName: "isPublic",
  //       })
  //       .then((data) => {
  //         if (data == true) {
  //           setstatus(3);
  //         } else {
  //           setstatus(2);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   };
  //   fetchData();
  //   // const intervalId = setInterval(fetchData, 600000);
  //   // return () => clearInterval(intervalId);
  // }, []);
  // return { currentStatus: status };
};

export default useCurrentStatus;
