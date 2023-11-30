const maxSupply = Number(process.env.NEXT_PUBLIC_MAX_SUPPLY);
const maxSupplyToken = Number(process.env.NEXT_PUBLIC_MAX_SUPPLY_TOKEN);

const RemainingCard = ({ tokenSupply, isTokenSupplyError }) => {
  if (isTokenSupplyError) {
    return (
      <p className="text-base sm:pt-1 sm:text-2xl">
        loading... /{maxSupplyToken}
      </p>
    );
  }

  return (
    <p className="text-base sm:pt-1 sm:text-2xl font-[ProximaRegular]">
      {tokenSupply != 0 ? maxSupplyToken - tokenSupply : maxSupplyToken}/
      {maxSupplyToken}
    </p>
  );
};

export default RemainingCard;
