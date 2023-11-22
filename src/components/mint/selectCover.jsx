import { useState } from "react";

const SelectCover = ({ approveMint, setCoverSelected }) => {
  const [selectedCover, setSelectedCover] = useState("black");

  const handleSelectedCoverChange = (e) => {
    const newCover = e.target.value;
    if (newCover === "Black" || newCover === "Purple") {
      setSelectedCover(newCover);
      setCoverSelected(newCover === "Black" ? 1 : 2);
    }
    if (newCover == "Both: Black + Purple") {
      setSelectedCover(newCover);
      setCoverSelected(3);
    }
  };

  return (
    <div className="pt-4">
      <label className="mr-2 text-white">Select cover to mint:</label>
      <select
        id="Cover select"
        value={selectedCover}
        onChange={handleSelectedCoverChange}
        disabled={!approveMint}
        className="px-2 py-1 text-white bg-black border border-white"
      >
        <option>Black</option>
        <option>Purple</option>
        <option>Both: Black + Purple</option>
      </select>
    </div>
  );
};

export default SelectCover;
