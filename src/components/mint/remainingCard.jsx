const maxSupply = 200;
const maxSupplyToken = 100;

const RemainingCard = ({ tokenSupply, isTokenSupplyError }) => {
  if (isTokenSupplyError) {
    return (
      <p className="text-base sm:pt-1 sm:text-2xl">
        loading... /{maxSupplyToken}
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

export default RemainingCard;
