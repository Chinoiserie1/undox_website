import useToken1Supply from "@/hooks/useToken1Supply";
import useToken2Supply from "@/hooks/useToken2Supply";

const maxSupply = Number(process.env.NEXT_PUBLIC_MAX_SUPPLY);
const maxSupplyToken = Number(process.env.NEXT_PUBLIC_MAX_SUPPLY_TOKEN);

const Remaining = ({ setAllQuantityMinted }) => {
  const { token1Supply, isToken1SupplyError } = useToken1Supply();
  const { token2Supply, isToken2SupplyError } = useToken2Supply();

  const totalAmountMinted =
    token1Supply && token2Supply ? token1Supply + token2Supply : 0;

  if (totalAmountMinted === maxSupply) {
    setAllQuantityMinted(true);
  }

  return (
    <div className="flex justify-center pb-4">
      <div>
        <p className="font-bold">TOTAL REMAINING</p>
        <div className="flex flex-row justify-center pt-2">
          <p className="pt-1 text-2xl font-bold sm:text-3xl sm:text-center">
            {totalAmountMinted != 0 ? maxSupply - totalAmountMinted : maxSupply}
          </p>
          <p className="pt-1 text-2xl sm:text-3xl sm:text-center">/</p>
          <p className="pt-3 sm:pt-3.5 text-base sm:text-xl sm:text-center">
            {maxSupply}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Remaining;
