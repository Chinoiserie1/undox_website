"use client";
import { useState } from "react";
import { useAccount } from "wagmi";
import ConnectWallet from "./connectWallet";
import DisplayWallet from "./displayWallet";
import Form from "./form";

const Mint = () => {
  const currentStatus = 0;
  const status = ["Allowlist", "Whitelist", "Public"];
  const { address } = useAccount();
  const connected = address ? true : false;

  return (
    <div className="pt-10">
      <h1 className="pb-10 font-bold">Mint</h1>
      {/* Connect Wallet and Sale Status */}
      <div className="w-full overflow-hidden border border-white shadow">
        <div className="flex w-full">
          {connected ? <DisplayWallet address={address} /> : <ConnectWallet />}
          <div className="flex items-center w-1/2 font-bold sm:text-xl lg:text-2xl">
            <div className="px-4 py-5 sm:p-6">
              <p>{status[currentStatus]}</p>
            </div>
          </div>
        </div>
      </div>
      <Form address={address} connected={connected} />
    </div>
  );
};

export default Mint;
