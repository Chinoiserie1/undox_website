import { useContractRead } from "wagmi";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useEffect, useState } from "react";
import useToken1Supply from "@/hooks/useToken1Supply";
import useToken2Supply from "@/hooks/useToken2Supply";

const maxSupply = Number(process.env.NEXT_PUBLIC_MAX_SUPPLY);
const maxSupplyToken = Number(process.env.NEXT_PUBLIC_MAX_SUPPLY_TOKEN);

const Remaining = ({ setAllQuantityMinted }) => {
  const { token1Supply, isToken1SupplyError } = useToken1Supply();
  const { token2Supply, isToken2SupplyError } = useToken2Supply();

  const totalAmountMinted =
    token1Supply != undefined && token2Supply != undefined
      ? token1Supply + token2Supply
      : 0;

  if (totalAmountMinted === maxSupply) {
    setAllQuantityMinted(true);
  }

  return (
    <div className="flex flex-col sm:flex-row sm:justify-center">
      <div>
        <p>Remaining total</p>
        <p className="pt-1 text-base sm:text-2xl">
          {totalAmountMinted != 0 ? maxSupply - totalAmountMinted : maxSupply}/
          {maxSupply}
        </p>
      </div>
    </div>
  );
};

export default Remaining;
