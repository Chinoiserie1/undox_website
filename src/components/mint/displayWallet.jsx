"use client";
import { useBalance, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

const DisplayWallet = ({ address }) => {
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { data, isError, isLoading } = useBalance({
    address: address,
  });

  const formatedBalance = data == undefined ? 0 : data.formatted;
  const balanceNumber = parseFloat(formatedBalance);
  const roundedBalance = balanceNumber.toFixed(2);

  const displayAddress = address.slice(0, 6) + "..." + address.slice(-2);

  return (
    <div className="flex items-center w-1/2 px-4 py-5 border-white border-r-3 md:text-xl lg:text-lg">
      <p>{roundedBalance} ETH</p>
      <div className="flex items-center ml-auto">
        <button className="mr-0" onClick={() => open()}>
          {displayAddress}
        </button>
      </div>
    </div>
  );
};

export default DisplayWallet;
