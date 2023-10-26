import { useContractRead } from "wagmi";
import ABI from "@/app/contract/abi/UNDOXXED.json";

const Remaining = () => {
  const maxSupply = 500;
  const maxSupplyToken1 = 250;
  const maxSupplyToken2 = 250;

  const contractReadToken1 = useContractRead({
    address: "0x2d308a424474e2632a7cc10c9a6791f3f1b7192f",
    abi: ABI.abi,
    functionName: "getToken1Supply",
    enabled: false,
    onError: (err) => {
      console.error(err);
    },
  });

  const contractReadToken2 = useContractRead({
    address: "0x2d308a424474e2632a7cc10c9a6791f3f1b7192f",
    abi: ABI.abi,
    functionName: "getToken2Supply",
    enabled: false,
    onError: (err) => {
      console.error(err);
    },
  });

  const token1AmountMinted = Number(contractReadToken1.data);
  const token2AmountMinted = Number(contractReadToken2.data);
  const getTotalAmountMinted = (value1, value2) => {
    if (typeof value1 === "number" && typeof value2 === "number") {
      return value1 + value2;
    } else {
      return 0;
    }
  };
  const totalAmountMinted = getTotalAmountMinted(
    token1AmountMinted,
    token2AmountMinted
  );

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between">
      <div>
        <p>Remaining</p>
        <p className="pt-1 text-base sm:text-2xl">
          {totalAmountMinted ? maxSupply - totalAmountMinted : maxSupply}/
          {maxSupply}
        </p>
      </div>
      <div className="pt-4 sm:pt-0">
        <p>Remaining cover 1</p>
        <p className="text-base sm:pt-1 sm:text-2xl">
          {token1AmountMinted ? token1AmountMinted : maxSupplyToken1}/
          {maxSupplyToken1}
        </p>
      </div>
      <div className="pt-4 sm:pt-0">
        <p>Remaining cover 2</p>
        <p className="pt-1 text-base sm:text-2xl">
          {token2AmountMinted ? token2AmountMinted : maxSupplyToken2}/
          {maxSupplyToken2}
        </p>
      </div>
    </div>
  );
};

export default Remaining;
