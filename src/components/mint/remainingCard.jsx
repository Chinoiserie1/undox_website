const maxSupply = Number(process.env.NEXT_PUBLIC_MAX_SUPPLY);
const maxSupplyToken = Number(process.env.NEXT_PUBLIC_MAX_SUPPLY_TOKEN);

const RemainingCard = ({ tokenSupply, isTokenSupplyError }) => {
  if (isTokenSupplyError) {
    return (
      <p className="text-base md:pt-1 md:text-2xl font-arial">
        loading... <span className="font-arial">/</span>
        {maxSupplyToken}
      </p>
    );
  }

  return (
    <p className="text-base md:pt-1 md:text-2xl font-arial">
      {tokenSupply != 0 ? maxSupplyToken - tokenSupply : maxSupplyToken}
      <span className="font-arial">/</span>
      {maxSupplyToken}
    </p>
  );
};

export default RemainingCard;
