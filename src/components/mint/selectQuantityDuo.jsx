import { useState } from "react";
const { default: useGetBalanceCover1 } = require("@/hooks/getBalanceOfCover1");
const { default: useGetBalanceCover2 } = require("@/hooks/getBalanceOfCover2");

const SelectQuantityInput = ({
  approveMint,
  message,
  optionsArray,
  setQuantityCover,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity !== 0) {
      setQuantity(newQuantity);
      setQuantityCover(newQuantity);
    }
  };

  return (
    <div className="pt-4">
      <label className="mr-2 text-white">{message}</label>
      <select
        id="Select quantity black"
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

const SelectQuantityDuo = ({ approveMint }) => {
  const [quantityBlack, setQuantityBlack] = useState(1);
  const [quantityPurple, setQuantityPurple] = useState(1);
  const { dataCover1, errorCover1, isErrorCover1 } = useGetBalanceCover1();
  const { dataCover2, errorCover2, isErrorCover2 } = useGetBalanceCover2();

  const maxQuantityBlackToMint = 10 - Number(dataCover1);
  const maxQuantityPurpleToMint = 10 - Number(dataCover2);

  const optionsArrayBlack = Array.from(
    { length: maxQuantityBlackToMint },
    (_, index) => index + 1
  );
  const optionsArrayPurple = Array.from(
    { length: maxQuantityPurpleToMint },
    (_, index) => index + 1
  );

  return (
    <div>
      <SelectQuantityInput
        approveMint={approveMint}
        message="Select quantity Black cover:"
        setQuantityCover={setQuantityBlack}
        optionsArray={optionsArrayBlack}
      />
      <SelectQuantityInput
        approveMint={approveMint}
        message="Select quantity Purple cover::"
        setQuantityCover={setQuantityPurple}
        optionsArray={optionsArrayPurple}
      />
    </div>
  );
};

export default SelectQuantityDuo;
