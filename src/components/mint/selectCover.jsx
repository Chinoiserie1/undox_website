import { useState } from "react";
import useToken1Supply from "@/hooks/useToken1Supply";
import useToken2Supply from "@/hooks/useToken2Supply";
import useGetBalanceCover1 from "@/hooks/getBalanceOfCover1";
import useGetBalanceCover2 from "@/hooks/getBalanceOfCover2";

const maxSupplyToken = Number(process.env.NEXT_PUBLIC_MAX_SUPPLY_TOKEN);

const SelectCover = ({ approveMint, setCoverSelected }) => {
  const [selectedCover, setSelectedCover] = useState("black");
  const { dataCover1 } = useGetBalanceCover1();
  const { dataCover2 } = useGetBalanceCover2();
  const { token1Supply } = useToken1Supply();
  const { token2Supply } = useToken2Supply();

  const showBoth = () => {
    if (dataCover1 == 10) return false;
    if (dataCover2 == 10) return false;
    if (token1Supply == maxSupplyToken) return false;
    if (token2Supply == maxSupplyToken) return false;
    return true;
  };

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
        className="px-2 py-1 text-white border border-white bg-ob-blackbg"
      >
        <option>Black</option>
        <option>Purple</option>
        {showBoth() && <option>Both: Black + Purple</option>}
      </select>
    </div>
  );
};

export default SelectCover;
