// import { CheckoutWithCard } from "@paperxyz/react-client-sdk";
// import { Dialog, Transition } from "@headlessui/react";
// import { useEffect, useState } from "react";
// import { useWaitForTransaction } from "wagmi";
// import { parseEther } from "viem";
// import { storeMintClick } from "@/app/api/storeMintClick";
// import ErrorDialog from "./errorDialog";
// import TransactionSubmited from "./transactionSubmit";
// import MintSuccess from "./mintSuccess";

// import { getTransactionStatus } from "@/app/api/getTransactionStatus";
// import MintSuccessDialog from "./mintSuccessDialog";

// //22,4 L x 26,7 H cm

// const useGetValidInfosFiatPayment = (mintInfos) => {
//   const { success, status, quantityCover1, quantityCover2 } = mintInfos;

//   const [isValid, setIsValid] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     setIsValid(true);
//     setErrorMessage("");
//     if (quantityCover1 == 0 && quantityCover2 == 0) {
//       setIsValid(false);
//       setErrorMessage("Error can't mint zero quantity");
//     }
//     if (!success) {
//       if (status == 1) {
//         setIsValid(false);
//         setErrorMessage("Error you are not allowlisted");
//       } else if (status == 2) {
//         setIsValid(false);
//         setErrorMessage("Error you are not whitelisted");
//       }
//     }
//   }, [quantityCover1, quantityCover2, status, success]);

//   return { isValid, errorMessage };
// };

// const FiatPayment = ({ approveMint, allQuantityMinted, mintInfos }) => {
//   const [isOpenFiatPayment, setIsOpenFiatPayment] = useState(false);
//   const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
//   const [transactionId, setTransactionId] = useState("");
//   const [hash, setHash] = useState("");
//   const { isValid, errorMessage } = useGetValidInfosFiatPayment(mintInfos);

//   const waitForTransaction = useWaitForTransaction({
//     hash: hash ? hash : "",
//   });

//   const openFiatPayment = () => {
//     setHash("");
//     setIsPaymentSuccess(false);
//     setIsOpenFiatPayment(true);
//     storeMintClick({
//       ETHAddress: mintInfos.address,
//       cover1: mintInfos.quantityCover1,
//       cover2: mintInfos.quantityCover2,
//     });
//   };

//   const closeFiatPayment = () => {
//     setIsOpenFiatPayment(false);
//   };

//   useEffect(() => {
//     if (isPaymentSuccess) {
//       async function fetchData() {
//         try {
//           const transactionStatus = await getTransactionStatus(transactionId);
//           if (transactionStatus.result.transactionHash) {
//             setHash(transactionStatus.result.transactionHash);
//           } else {
//             setErrorMessage("Error during mint");
//           }
//           // return transactionStatus.result;
//         } catch (error) {
//           console.error("Error fetching transaction status:", error);
//         }
//       }
//       fetchData();
//     }
//   }, [isPaymentSuccess, transactionId]);

//   if (allQuantityMinted) return;

//   return (
//     <div className="flex justify-center pt-6">
//       <button
//         className="w-1/2 px-4 py-2 text-white border border-white bg-ob-blackbg md:w-1/4 hover:bg-white hover:text-black"
//         disabled={!approveMint}
//         onClick={openFiatPayment}
//       >
//         Pay with Fiat
//       </button>
//       {isOpenFiatPayment && errorMessage && (
//         <ErrorDialog
//           errorMessage={errorMessage}
//           onClose={() => setIsOpenFiatPayment(false)}
//         />
//       )}
//       <TransactionSubmited success={isPaymentSuccess} hash={hash} />
//       {waitForTransaction.data?.status == "success" && (
//         <MintSuccessDialog hash={hash} />
//       )}
//       {isValid && (
//         <Dialog
//           open={isOpenFiatPayment}
//           onClose={() => setIsOpenFiatPayment(false)}
//           className="relative z-50"
//         >
//           <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
//           <div className="fixed inset-0 flex items-center justify-center w-screen p-4">
//             <Dialog.Panel className="w-full max-w-sm bg-white rounded">
//               {/* <Dialog.Title>Complete your order with card</Dialog.Title> */}

//               <div className="w-full px-4 py-5 md:p-6">
//                 <CheckoutWithCard
//                   configs={{
//                     // Registered contract ID
//                     contractId: process.env.NEXT_PUBLIC_PAPER_ID,
//                     // Buyer wallet address
//                     walletAddress: mintInfos.address,
//                     // Mint method (for custom contracts only)
//                     mintMethod: {
//                       name: "fiatPaymentMint",
//                       args: {
//                         _to: mintInfos.address,
//                         _amount1: mintInfos.quantityCover1,
//                         _amount2: mintInfos.quantityCover2,
//                         _amount1Sign: mintInfos.cover1,
//                         _amount2Sign: mintInfos.cover2,
//                         _sign: mintInfos.signature,
//                       },
//                       payment: {
//                         value: mintInfos.value.toString(),
//                         currency: "ETH",
//                       },
//                     },
//                   }}
//                   onPaymentSuccess={(result) => {
//                     console.log("Payment successful:", result);
//                     setIsOpenFiatPayment(false);
//                     setTransactionId(result.transactionId);
//                     setIsPaymentSuccess(true);
//                   }}
//                   onError={(error) => {
//                     console.log("error :", error);
//                   }}
//                 />
//               </div>
//             </Dialog.Panel>
//           </div>
//         </Dialog>
//       )}
//     </div>
//   );
// };

// export default FiatPayment;
