"use client";
import { useState, useEffect, useContext } from "react";
import { useAccount } from "wagmi";
import { formatEther } from "viem";
import ConnectWallet from "./connectWallet";
import DisplayWallet from "./displayWallet";
import Form from "./form";
import Divider from "../separator";
import { getShippingInfo } from "@/app/api/getShippingInfo";
import checkUserWhitelisted, { isWhitelisted } from "./checkUserWhitelisted";
import ErrorDialog from "./errorDialog";

import ABI from "@/app/contract/abi/UNDOXXED.json";
import DisplayCurrentStatus from "./displayCurrentStatus";
import MintPart2 from "./mintPart2";
import validateForm from "./validateForm";
import SaleChanel from "./saleChanel";

import useCurrentStatus from "@/hooks/useCurrentStatus";
import useGetPublicPrice from "@/hooks/useGetPublicPrice";

const Mint = () => {
  const { address } = useAccount();
  const connected = address ? true : false;
  const [select, setSelect] = useState(0);

  const [approveMint, setApproveMint] = useState(false);

  const [infoSend, setInfoSend] = useState(false);

  const [shippingInfo, setShippingInfo] = useState(null);

  const status = useCurrentStatus();

  const { publicPrice } = useGetPublicPrice();

  const whitelistInfos = isWhitelisted(address);

  function hasFullyFilledObject(shippingInfoArray) {
    return shippingInfoArray.some((shippingInfo) => {
      // return Object.values(shippingInfo).every((value) => value !== "");
      return validateForm(shippingInfo);
    });
  }

  // console.log(shippingInfo);

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

  return (
    <div className="pt-10">
      <div className="block px-10 py-5 text-3xl font-bold text-center text-white uppercase md:text-4xl">
        <DisplayCurrentStatus />
      </div>
      <div className="w-full mt-10 overflow-hidden border-white shadow border-3">
        <div className="flex w-full">
          <div className="flex items-center w-1/2 border-white md:text-2xl lg:text-3xl border-r-3">
            <div className="px-4 py-5 font-semibold md:p-6">
              {status == 2
                ? whitelistInfos.isWhitelisted
                  ? "You are WHITELISTED"
                  : "You are not WHITELISTED"
                : `Price: ${formatEther(publicPrice.toString())} ETH`}
            </div>
          </div>
          {connected ? <DisplayWallet address={address} /> : <ConnectWallet />}
        </div>
      </div>
      <div className="w-full overflow-hidden border-t-0 border-white shadow border-l-3 border-r-3 border-b-3">
        <SaleChanel
          approveMint={approveMint}
          select={select}
          setSelected={setSelect}
        />
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
