"use client";
import { useEffect, useState } from "react";
import useToken1Supply from "@/hooks/useToken1Supply";
import useToken2Supply from "@/hooks/useToken2Supply";
import useReservedToken1 from "@/hooks/useReservedToken1";
import useReservedToken2 from "@/hooks/useReservedToken2";
import useMaxSupplyMintable from "@/hooks/useMaxSupplyMintable";
import useMaxSupplyByCoverMintable from "@/hooks/useMaxSupplyByCoverMintable";

// const maxSupply = Number(process.env.NEXT_PUBLIC_MAX_SUPPLY);
// const maxSupplyToken = Number(process.env.NEXT_PUBLIC_MAX_SUPPLY_TOKEN);

const SelectQuantity = ({
  approveMint,
  selectedCover,
  setQuantityCover,
  setDisableMint,
}) => {
  const [quantity, setQuantity] = useState(1);
  const { token1Supply } = useToken1Supply();
  const { token2Supply } = useToken2Supply();
  const { cover1Reserved } = useReservedToken1();
  const { cover2Reserved } = useReservedToken2();
  const { maxSupply } = useMaxSupplyMintable();
  const { maxSupplyCover } = useMaxSupplyByCoverMintable();

  const remainingToken1 = maxSupplyCover - (token1Supply + cover1Reserved);
  const remainingToken2 = maxSupplyCover - (token2Supply + cover2Reserved);

  const remainingCover =
    selectedCover === 1 ? remainingToken1 : remainingToken2;
  const maxQuantityToMintUser = 10;
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

  return (
    <div className="pt-4">
      <label className="mr-2 text-white">Select quantity to mint:</label>
      <select
        id="Cover 2"
        value={quantity}
        onChange={(e) => handleQuantityChange(e)}
        disabled={!approveMint}
        className="w-16 px-2 py-1 text-white border border-white bg-ob-blackbg font-arial"
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
