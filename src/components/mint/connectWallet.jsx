"use client";
import { useWeb3Modal } from "@web3modal/wagmi/react";

const buttonStyle =
  "flex items-center justify-center w-1/2 px-4 py-5 font-bold text-black bg-white sm:p-6 hover:bg-black hover:text-white hover:border-r hover:border-white";

const ConnectWallet = () => {
  const { open } = useWeb3Modal();

  return (
    <button className={buttonStyle} onClick={() => open()}>
      Connect Wallet
    </button>
  );
};

export default ConnectWallet;
