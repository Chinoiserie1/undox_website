import { useState } from "react";
import Image from "next/image";

const cover2Img = "/images/cover/coverPurple.jpg";

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
        <Image
          src={cover2Img}
          alt="Cover2Image"
          width={224 * 3}
          height={267 * 3}
        />
      </div>
      {/* <label className="mr-2 text-white">Cover 2:</label> */}
      {/* <select
        id="Cover 2"
        value={quantityCover2Change}
        onChange={handleQuantityChangeCover2}
        disabled={!approveMint}
        className="w-16 px-2 py-1 text-white bg-black border border-white"
      >
        <option>0</option>
        <option>1</option>
        <option>2</option>
      </select> */}
    </div>
  );
};

export default Cover2;
