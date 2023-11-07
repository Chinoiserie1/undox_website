import { useState } from "react";

const cover1Img = "/images/book/UNDX_FLIP_A.jpg";

const Cover1 = ({ approveMint, setQuantityCover1 }) => {
  const [quantityCover1Change, setQuantityCover1Change] = useState(0);

  const handleQuantityChangeCover1 = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantityCover1(newQuantity);
      setQuantityCover1Change(newQuantity);
    }
  };

  return (
    <div className="w-full sm:w-1/2">
      <div className="px-4 py-5 sm:p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover1Img} alt="Cover1" />
      </div>
      <label className="mr-2 text-white">Cover 1:</label>
      <select
        id="Cover 1"
        value={quantityCover1Change}
        onChange={handleQuantityChangeCover1}
        disabled={!approveMint}
        className="w-16 px-2 py-1 text-white bg-black border border-white"
      >
        <option>0</option>
        <option>1</option>
        <option>2</option>
      </select>
    </div>
  );
};

export default Cover1;
