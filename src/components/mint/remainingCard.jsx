import useMaxSupplyByCoverMintable from "@/hooks/useMaxSupplyByCoverMintable";
import useAllQuantityMinted from "@/hooks/useAllQuantityMinted";

const RemainingCard = ({ tokenSupply, coverReserved, isTokenSupplyError }) => {
  const { maxSupplyCover } = useMaxSupplyByCoverMintable();
  const { allQuantityMinted } = useAllQuantityMinted();

  if (isTokenSupplyError) {
    return (
      <p className="text-base md:pt-1 md:text-2xl font-arial">
        loading... <span className="font-arial">/</span>
        {maxSupplyCover}
      </p>
    );
  }

  if (allQuantityMinted) {
    return (
      <p className="text-base md:pt-1 md:text-2xl font-arial">
        0<span className="font-arial">/</span>
        {maxSupplyCover}
      </p>
    );
  }

  return (
    <p className="text-base md:pt-1 md:text-2xl font-arial">
      {tokenSupply != 0
        ? maxSupplyCover - tokenSupply - coverReserved
        : maxSupplyCover}
      <span className="font-arial">/</span>
      150
    </p>
  );
};

export default RemainingCard;
