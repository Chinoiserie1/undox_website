"use client";
import { useState, useEffect } from "react";
import { useAccount, useContractWrite } from "wagmi";
import ConnectWallet from "./connectWallet";
import DisplayWallet from "./displayWallet";
import Form from "./form";
import Divider from "../separator";
import { getShippingInfo } from "@/app/api/getShippingInfo";
import Remaining from "./remaining";

import ABI from "@/app/contract/abi/UNDOXXED.json";
import DisplayCurrentStatus from "./displayCurrentStatus";

const Mint = () => {
  const { address } = useAccount();
  const connected = address ? true : false;

  const [approveMint, setApproveMint] = useState(false);

  const [quantityCover1, setQuantityCover1] = useState(0);
  const [quantityCover2, setQuantityCover2] = useState(0);

  const [currentStatus, setCurrentStatus] = useState(0);

  const status = {
    0: "Initialize",
    1: "allowlistMint",
    2: "whitelistMint",
    3: "mint",
    4: "End",
    5: "Pause",
  };

  const handleChildStatusChange = (value) => {
    setCurrentStatus(value);
  };

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: "0x2D308A424474E2632a7cc10C9A6791F3f1B7192f",
    abi: ABI.abi,
    functionName: "claim",
  });

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

  const handleQuantityChangeCover1 = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantityCover1(newQuantity);
    }
  };

  const handleQuantityChangeCover2 = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantityCover2(newQuantity);
    }
  };

  return (
    <div className="pt-10">
      <h1 className="pb-10 font-bold">Mint</h1>
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
        <Divider />
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
            {/* Mint button */}
            <div className="flex flex-col w-full pt-6 sm:flex-row">
              <div className="w-full sm:w-1/2">
                {/* insert image cover 1 */}
                <label className="mr-2 text-white">Cover 1:</label>
                <select
                  id="Cover 1"
                  value={quantityCover1}
                  onChange={handleQuantityChangeCover1}
                  disabled={!approveMint}
                  className="w-16 px-2 py-1 text-white bg-black border border-white"
                >
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>
              <div className="pt-4 sm:pt-0"></div>
              <div className="w-full sm:w-1/2">
                {/* insert image cover 2 */}
                <label className="mr-2 text-white ">Cover 2:</label>
                <select
                  id="Cover 2"
                  value={quantityCover2}
                  onChange={handleQuantityChangeCover2}
                  disabled={!approveMint}
                  className="w-16 px-2 py-1 text-white bg-black border border-white"
                >
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center pt-6">
              <button
                className="w-1/2 px-4 py-2 text-white bg-black border border-white sm:w-1/4 hover:bg-white hover:text-black"
                disabled={!approveMint}
              >
                MINT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mint;
