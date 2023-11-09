import { useContractRead } from "wagmi";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useEffect, useState } from "react";

const maxSupply = 300;
const maxSupplyToken1 = 150;
const maxSupplyToken2 = 150;

const Remaining = () => {
  const [token1Amount, setToken1Amount] = useState(0);
  const [token2Amount, setToken2Amount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const contractReadToken1 = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI.abi,
    functionName: "getToken1Supply",
    structuralSharing: (prev, next) => (prev === next ? prev : next),
    watch: true,
    onError: (err) => {
      console.error(err);
    },
  });

  const contractReadToken2 = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI.abi,
    functionName: "getToken2Supply",
    structuralSharing: (prev, next) => (prev === next ? prev : next),
    watch: true,
    onError: (err) => {
      console.error(err);
    },
  });

  const getTotalAmountMinted = (value1, value2) => {
    if (typeof value1 === "number" && typeof value2 === "number") {
      return value1 + value2;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    if (contractReadToken1.data != undefined) {
      setToken1Amount(Number(contractReadToken1.data));
    }
  }, [contractReadToken1.data]);

  useEffect(() => {
    if (contractReadToken2.data != undefined) {
      setToken2Amount(Number(contractReadToken2.data));
    }
  }, [contractReadToken2.data]);

  useEffect(() => {
    setTotalAmount(getTotalAmountMinted(token1Amount, token2Amount));
  }, [token1Amount, token2Amount]);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between">
      <div>
        <p>Remaining</p>
        <p className="pt-1 text-base sm:text-2xl">
          {totalAmount != 0 ? maxSupply - totalAmount : maxSupply}/{maxSupply}
        </p>
      </div>
      <div className="pt-4 sm:pt-0">
        <p>Remaining cover 1</p>
        <p className="text-base sm:pt-1 sm:text-2xl">
          {token1Amount != 0 ? maxSupplyToken1 - token1Amount : maxSupplyToken1}
          /{maxSupplyToken1}
        </p>
      </div>
      <div className="pt-4 sm:pt-0">
        <p>Remaining cover 2</p>
        <p className="pt-1 text-base sm:text-2xl">
          {token2Amount != 0 ? maxSupplyToken2 - token2Amount : maxSupplyToken2}
          /{maxSupplyToken2}
        </p>
      </div>
    </div>
  );
};

export default Remaining;
