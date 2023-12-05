"use client";
import { useEffect, useState } from "react";
import useToken1Supply from "@/hooks/useToken1Supply";
import useToken2Supply from "@/hooks/useToken2Supply";
const { default: useGetBalanceCover1 } = require("@/hooks/getBalanceOfCover1");
const { default: useGetBalanceCover2 } = require("@/hooks/getBalanceOfCover2");

const maxSupply = Number(process.env.NEXT_PUBLIC_MAX_SUPPLY);
const maxSupplyToken = Number(process.env.NEXT_PUBLIC_MAX_SUPPLY_TOKEN);

// {
//   "address": "0x0a19B1b44B6b3D97C125c2D126beD4b734C500C0",
//   "signature": "0xaa0ebb32b3f6edfc2e2b8f567a27cfe2245c0fa816d817d9cc2cf0619c18281a4083ba9480af2fa424be610f6f88de31b109e513629f81fc4eb5d2eed69422da1b",
//   "amountCover1": 10,
//   "amountCover2": 10
// },

const SelectQuantity = ({
  approveMint,
  selectedCover,
  setQuantityCover,
  setDisableMint,
}) => {
  const [quantity, setQuantity] = useState(1);
  const { dataCover1 } = useGetBalanceCover1();
  const { dataCover2 } = useGetBalanceCover2();
  const { token1Supply } = useToken1Supply();
  const { token2Supply } = useToken2Supply();

  const remainingToken1 = maxSupplyToken - token1Supply;
  const remainingToken2 = maxSupplyToken - token2Supply;

  const quantityMinted = selectedCover === 1 ? dataCover1 : dataCover2;
  const remainingCover =
    selectedCover === 1 ? remainingToken1 : remainingToken2;
  const maxQuantityToMintUser = 10 - Number(quantityMinted);
  const maxQuantityToMint =
    maxQuantityToMintUser < remainingCover
      ? maxQuantityToMintUser
      : remainingCover;
  const optionsArray = Array.from(
    { length: maxQuantityToMint },
    (_, index) => index + 1
  );

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity !== 0) {
      setQuantity(newQuantity);
      setQuantityCover(newQuantity);
    }
  };

  if (remainingCover == 0) {
    setDisableMint(true);
    return (
      <div className="pt-4">
        <p className="mr-2 text-white">{`Cover ${
          selectedCover === 1 ? "Black" : "Purple"
        } sold out`}</p>
      </div>
    );
  }

  if (maxQuantityToMintUser == 0) {
    setDisableMint(true);
    return (
      <div className="pt-4">
        <p className="mr-2 text-white">Max quantity minted for this cover</p>
      </div>
    );
  }

  setDisableMint(false);

  return (
    <div className="pt-4">
      <label className="mr-2 text-white">Select quantity to mint:</label>
      <select
        id="Cover 2"
        value={quantity}
        onChange={handleQuantityChange}
        disabled={!approveMint}
        className="w-16 px-2 py-1 text-white bg-black border border-white"
      >
        {optionsArray.map((optionValue) => (
          <option key={optionValue} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectQuantity;
