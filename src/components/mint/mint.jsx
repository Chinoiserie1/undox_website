"use client";
import { useState, useEffect, useContext } from "react";
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
import validateForm from "./validateForm";
import SaleChanel from "./saleChanel";

const Mint = () => {
  const { address } = useAccount();
  const connected = address ? true : false;
  const [select, setSelect] = useState(0);

  const [approveMint, setApproveMint] = useState(false);

  const [infoSend, setInfoSend] = useState(false);

  const [shippingInfo, setShippingInfo] = useState(null);

  function hasFullyFilledObject(shippingInfoArray) {
    return shippingInfoArray.some((shippingInfo) => {
      // return Object.values(shippingInfo).every((value) => value !== "");
      return validateForm(shippingInfo);
    });
  }

  console.log(shippingInfo);

  // fetch and approve shipping info
  useEffect(() => {
    const fetchShippingInfo = async () => {
      if (address) {
        try {
          const response = await getShippingInfo(address);
          console.log(response);

          if (response.rowCount > 0) {
            setApproveMint(hasFullyFilledObject(response.rows));
            setSelect(hasFullyFilledObject(response.rows) ? 1 : 0);
            setShippingInfo(response?.rows[response.rowCount - 1]);
          } else {
            setApproveMint(false);
            setSelect(0);
          }
        } catch (error) {
          console.error("Error fetching shipping information:", error);
          setApproveMint(false);
          setSelect(0);
        }
      } else {
        setApproveMint(false);
        setSelect(0);
      }
    };

    fetchShippingInfo();
  }, [address, infoSend]);

  // useEffect(() => {
  //   const mintStep2Element = document.getElementById("step2");

  //   if (mintStep2Element) mintStep2Ref.current = mintStep2Element;
  //   if (approveMint && mintStep2Ref.current) {
  //     mintStep2Ref.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [approveMint, mintStep2Ref]);

  return (
    <div className="pt-10">
      <h1 className="inline-block px-10 py-5 text-3xl font-bold text-white uppercase border-white md:text-4xl border-3">
        MINT
      </h1>
      <div className="w-full mt-10 overflow-hidden border-white shadow border-3">
        <div className="flex w-full">
          {connected ? <DisplayWallet address={address} /> : <ConnectWallet />}
          <div className="flex items-center w-1/2 font-bold md:text-2xl lg:text-3xl">
            <div className="px-4 py-5 md:p-6">
              <DisplayCurrentStatus />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full overflow-hidden border-t-0 border-white shadow border-l-3 border-r-3 border-b-3">
        <SaleChanel select={select} setSelected={setSelect} />
        {select === 0 && (
          <div>
            <Form
              address={address}
              connected={connected}
              shoppingInfo={shippingInfo}
              setInfoSend={setInfoSend}
            />
          </div>
        )}
        {select === 1 && (
          <MintPart2 address={address} approveMint={approveMint} />
        )}
      </div>
    </div>
  );
};

export default Mint;
