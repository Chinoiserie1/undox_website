import { useContractRead } from "wagmi";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useEffect, useState } from "react";
import useToken1Supply from "@/hooks/useToken1Supply";
import useToken2Supply from "@/hooks/useToken2Supply";

const maxSupply = 200;
const maxSupplyToken = 100;

const RemainingToken = ({ tokenSupply, isTokenSupplyError }) => {
  if (isTokenSupplyError) {
    return (
      <p className="text-base sm:pt-1 sm:text-2xl">
        loading... /{maxSupplyToken1}
      </p>
    );
  }

  return (
    <p className="text-base sm:pt-1 sm:text-2xl">
      {tokenSupply != 0 ? maxSupplyToken - tokenSupply : maxSupplyToken}/
      {maxSupplyToken}
    </p>
  );
};

const Remaining = ({ setAllQuantityMinted }) => {
  const { token1Supply, isToken1SupplyError } = useToken1Supply();
  const { token2Supply, isToken2SupplyError } = useToken2Supply();

  const totalAmountMinted =
    token1Supply && token2Supply ? token1Supply + token2Supply : 0;

  if (totalAmountMinted === maxSupply) {
    setAllQuantityMinted(true);
  }

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between">
      <div>
        <p>Remaining</p>
        <p className="pt-1 text-base sm:text-2xl">
          {totalAmountMinted != 0 ? maxSupply - totalAmountMinted : maxSupply}/
          {maxSupply}
        </p>
      </div>
      <div className="pt-4 sm:pt-0">
        <p>Remaining cover 1</p>
        <RemainingToken
          tokenSupply={token1Supply}
          isTokenSupplyError={isToken1SupplyError}
        />
      </div>
      <div className="pt-4 sm:pt-0">
        <p>Remaining cover 2</p>
        <RemainingToken
          tokenSupply={token2Supply}
          isTokenSupplyError={isToken2SupplyError}
        />
      </div>
    </div>
  );
};

export default Remaining;
