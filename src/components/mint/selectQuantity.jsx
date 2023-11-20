import { useEffect, useState } from "react";

const { default: useGetBalanceCover1 } = require("@/hooks/getBalanceOfCover1");
const { default: useGetBalanceCover2 } = require("@/hooks/getBalanceOfCover2");

const SelectQuantity = ({ approveMint, selectedCover, setQuantityCover }) => {
  const [quantity, setQuantity] = useState(1);
  const { dataCover1, errorCover1, isErrorCover1 } = useGetBalanceCover1();
  const { dataCover2, errorCover2, isErrorCover2 } = useGetBalanceCover2();

  const quantityMinted = selectedCover === 1 ? dataCover1 : dataCover2;
  const maxQuantityToMint = 10 - Number(quantityMinted);
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

  if (maxQuantityToMint == 0) {
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
