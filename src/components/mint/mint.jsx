"use client";
import { useState, useEffect } from "react";
import { useAccount, useContractRead } from "wagmi";
import ConnectWallet from "./connectWallet";
import DisplayWallet from "./displayWallet";
import Form from "./form";
import XDivider from "../separator";
import { getShippingInfo } from "@/app/api/getShippingInfo";
import Remaining from "./remaining";

import ABI from "@/app/contract/abi/UNDOXXED.json";

const Mint = () => {
  const currentStatus = 0;
  const status = ["Allowlist", "Whitelist", "Public"];
  const { address } = useAccount();
  const connected = address ? true : false;

  const [approveMint, setApproveMint] = useState(false);

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
      <div className="w-full overflow-hidden border border-t-0 border-white shadow">
        <Form address={address} connected={connected} />
        <XDivider />
        <div className={!approveMint ? "opacity-50" : ""}>
          <div className="px-4 py-5 text-base sm:p-6">
            <p>Step 2: Mint your NFT</p>
            <p className="pt-4">
              We are thrilled to announce an exciting opportunity to showcase
              your artistic skills and make a lasting impact on the upcoming
              book “UNDOXXED” – a captivating exploration of “The Finest in
              Digital Lifestyle Culture”. We are seeking a captivating and
              visually striking design that encapsulates the essence of
              “UNDOXXED” and its exploration of digital culture for the cover,
              spine, and back of the book. This is an exceptional opportunity to
              leave your artistic imprint on a significant publication that will
              resonate with enthusiasts worldwide.
            </p>
            <div className="pt-6">
              <Remaining />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mint;
