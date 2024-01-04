// import { useContractRead } from "wagmi";
// import { useAccount } from "wagmi";
// import ABI from "@/app/contract/abi/UNDOXXED.json";
// import { useState, useEffect } from "react";

// const useGetBalanceCover1 = () => {
//   const { address } = useAccount();
//   const [balance, setBalance] = useState(0);
//   const { data, isError, isLoading, error } = useContractRead({
//     address: process.env.NEXT_PUBLIC_CONTRACT,
//     abi: ABI.abi,
//     watch: true,
//     functionName: "getBalanceOfCover1",
//     args: [address],
//     onError: (err) => {
//       console.error(err);
//     },
//   });

//   useEffect(() => {
//     if (data) {
//       setBalance(Number(data));
//     }
//   }, [data]);

//   return {
//     dataCover1: balance,
//     isErrorCover1: isError,
//     isLoadingCover1: isLoading,
//     errorCover1: error,
//   };
// };

// export default useGetBalanceCover1;
