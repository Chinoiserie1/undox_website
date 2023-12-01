const whitelistPrice = Number(process.env.NEXT_PUBLIC_WHITELIST_PRICE);
const publicPrice = Number(process.env.NEXT_PUBLIC_PUBLIC_PRICE);

const ShowPrice = ({ isUserWhitelist, quantityBlack, quantityPurple }) => {
  const quantity = quantityBlack + quantityPurple;

  return (
    <div className="pt-2">
      {isUserWhitelist ? `WHITELIST PRICE : ` : `PRICE : `}
      {isUserWhitelist ? whitelistPrice * quantity : publicPrice * quantity}
    </div>
  );
};

export default ShowPrice;
