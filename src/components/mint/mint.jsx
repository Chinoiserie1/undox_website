"use client";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import ConnectWallet from "./connectWallet";
import DisplayWallet from "./displayWallet";
import Form from "./form";
import Divider from "../separator";
import { getShippingInfo } from "@/app/api/getShippingInfo";
import checkUserWhitelisted from "./checkUserWhitelisted";
import ErrorDialog from "./errorDialog";

import ABI from "@/app/contract/abi/UNDOXXED.json";
import DisplayCurrentStatus from "./displayCurrentStatus";
import MintPart2 from "./mintPart2";

const Mint = () => {
  const { address } = useAccount();
  const connected = address ? true : false;

  const [approveMint, setApproveMint] = useState(false);

  const [currentStatus, setCurrentStatus] = useState(0);

  const handleChildStatusChange = (value) => {
    setCurrentStatus(value);
  };

  function hasFullyFilledObject(shippingInfoArray) {
    return shippingInfoArray.some((shippingInfo) => {
      return Object.values(shippingInfo).every((value) => value !== "");
    });
  }

  // fetch and approve shipping info
  useEffect(() => {
    const fetchShippingInfo = async () => {
      if (address) {
        try {
          const response = await getShippingInfo(address);

          if (response.rowCount > 0) {
            setApproveMint(hasFullyFilledObject(response.rows));
            console.log("success");
          } else {
            setApproveMint(false);
          }
        } catch (error) {
          console.error("Error fetching shipping information:", error);
          setApproveMint(false);
        }
      } else {
        setApproveMint(false);
      }
    };

    fetchShippingInfo();
  }, [address]);

  return (
    <div className="pt-10">
      <h1 className="pb-10 font-bold font-tt_moons">Mint</h1>
      {/* Connect Wallet and Sale Status */}
      <div className="w-full overflow-hidden border border-white shadow">
        <div className="flex w-full">
          {connected ? <DisplayWallet address={address} /> : <ConnectWallet />}
          <div className="flex items-center w-1/2 font-bold sm:text-xl lg:text-2xl">
            <div className="px-4 py-5 sm:p-6">
              <DisplayCurrentStatus onStatusChange={handleChildStatusChange} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full overflow-hidden border border-t-0 border-white shadow">
        <Form address={address} connected={connected} />
        {approveMint && (
          <div>
            <Divider />
            <MintPart2
              address={address}
              approveMint={approveMint}
              currentStatus={currentStatus}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Mint;
