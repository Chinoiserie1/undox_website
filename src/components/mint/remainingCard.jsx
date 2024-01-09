import useMaxSupplyByCoverMintable from "@/hooks/useMaxSupplyByCoverMintable";

const RemainingCard = ({ tokenSupply, isTokenSupplyError }) => {
  const { maxSupplyCover } = useMaxSupplyByCoverMintable();

  if (isTokenSupplyError) {
    return (
      <p className="text-base md:pt-1 md:text-2xl font-arial">
        loading... <span className="font-arial">/</span>
        {maxSupplyCover}
      </p>
    );
  }

  return (
    <p className="text-base md:pt-1 md:text-2xl font-arial">
      {tokenSupply != 0 ? maxSupplyCover - tokenSupply : maxSupplyCover}
      <span className="font-arial">/</span>
      {maxSupplyCover}
    </p>
  );
};

export default RemainingCard;
