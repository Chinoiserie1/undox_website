import useToken1Supply from "@/hooks/useToken1Supply";
import useToken2Supply from "@/hooks/useToken2Supply";
import useMaxSupplyMintable from "@/hooks/useMaxSupplyMintable";
import useAllQuantityMinted from "@/hooks/useAllQuantityMinted";

const Remaining = () => {
  const { token1Supply, isToken1SupplyError } = useToken1Supply();
  const { token2Supply, isToken2SupplyError } = useToken2Supply();
  const { maxSupply } = useMaxSupplyMintable();
  const { allQuantityMinted } = useAllQuantityMinted();

  const totalAmountMinted =
    token1Supply != undefined && token2Supply != undefined
      ? token1Supply + token2Supply
      : 0;

  if (allQuantityMinted)
    return (
      <div className="flex justify-center py-10">
        <div className="flex items-center gap-4 md:flex-2">
          <div className="text-4xl md:text-[200px] text-white font-black font-arial">
            SOLD
          </div>
          <div className="text-xs font-bold text-gray-500 uppercase">
            <div className="mb-1 text-2xl md:text-[43px] font-semibold">
              OUT
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-4 md:flex-2">
        <div className="text-7xl md:text-[200px] text-white font-black font-arial">
          {totalAmountMinted != 0 ? totalAmountMinted : 0}
        </div>
        <div className="text-xs font-bold text-gray-500 uppercase">
          <div className="mb-1 text-2xl md:text-[43px] font-semibold">
            <span className="font-arial">/</span> 300
          </div>
          already minted
        </div>
      </div>
    </div>
  );
};

export default Remaining;
