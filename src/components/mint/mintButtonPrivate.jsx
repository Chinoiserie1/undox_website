import { useContractWrite, useWaitForTransaction, useAccount } from "wagmi";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import getMintValue from "@/utils/getMintValue";
import { parseEther } from "viem";

import MintSuccessDialog from "./mintSuccessDialog";
import TransactionSubmited from "./transactionSubmit";

const MintButtonPrivate = ({ userInfos }) => {
  const { address } = useAccount();

  const { data, isLoading, isSuccess, isError, error, write } =
    useContractWrite({
      address: process.env.NEXT_PUBLIC_CONTRACT,
      abi: ABI.abi,
      functionName: "privateWhitelistMint",
    });

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleMint = () => {
    const value = getMintValue(2, userInfos?.cover1, userInfos?.cover2, true);
    write({
      args: [
        address,
        userInfos.cover1,
        userInfos.cover2,
        userInfos.cover1,
        userInfos.cover2,
        userInfos.signature,
      ],
      value: parseEther(value.toString()),
    });
  };

  return (
    <>
      <div className="flex justify-center pt-6">
        <button
          className="w-1/2 px-4 py-2 text-white bg-ob-blackbg md:w-1/4 hover:bg-white hover:text-black hover:border hover:border-black"
          onClick={handleMint}
        >
          MINT
        </button>
        <TransactionSubmited success={data ? true : false} hash={data?.hash} />
        {waitForTransaction.data?.status == "success" && (
          <MintSuccessDialog hash={data?.hash} />
        )}
      </div>
      {error && <p className="pt-1 text-xs text-center text-red-700">error</p>}
    </>
  );
};

export default MintButtonPrivate;
