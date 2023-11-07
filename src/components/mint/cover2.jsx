import { useState } from "react";

const cover2Img = "/images/cover2/UNDX_FLIP_B.jpg";

const Cover2 = ({ approveMint, setQuantityCover2 }) => {
  const [quantityCover2Change, setQuantityCover2Change] = useState(0);

  const handleQuantityChangeCover2 = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantityCover2(newQuantity);
      setQuantityCover2Change(newQuantity);
    }
  };

  return (
    <div className="w-full sm:w-1/2">
      <div className="px-4 py-5 sm:p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover2Img} alt="Cover1" />
      </div>
      <label className="mr-2 text-white">Cover 1:</label>
      <select
        id="Cover 1"
        value={quantityCover2Change}
        onChange={handleQuantityChangeCover2}
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

export default Cover2;
