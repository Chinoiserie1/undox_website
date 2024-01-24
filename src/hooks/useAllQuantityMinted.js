import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useEffect, useState } from "react";

import useCover1Supply from "./useCover1SupplyPublicClient";
import useCover2Supply from "./useCover2SupplyPublicClient";
import useMaxSupplyMintable from "./useMaxSupplyMintable";
import useTotalReservedCover from "@/hooks/useTotalReservedCover";

const useAllQuantityMinted = () => {
  const [allQuantityMinted, setAllQuantityMinted] = useState(false);
  const { cover1Supply } = useCover1Supply();
  const { cover2Supply } = useCover2Supply();
  const { maxSupply } = useMaxSupplyMintable();
  const { totalReserved } = useTotalReservedCover();

  const totalAmountMinted =
    cover1Supply != undefined && cover2Supply != undefined
      ? cover1Supply + cover2Supply
      : 0;

  if (
    totalAmountMinted + totalReserved == maxSupply &&
    !allQuantityMinted &&
    maxSupply != 0
  ) {
    setAllQuantityMinted(true);
  }

  return { allQuantityMinted: allQuantityMinted };
};

export default useAllQuantityMinted;
