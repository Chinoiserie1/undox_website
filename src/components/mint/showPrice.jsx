const whitelistPrice = Number(process.env.NEXT_PUBLIC_WHITELIST_PRICE);
const publicPrice = Number(process.env.NEXT_PUBLIC_PUBLIC_PRICE);

const ShowPrice = ({ isUserWhitelist, quantityBlack, quantityPurple }) => {
  const quantity = quantityBlack + quantityPurple;

  return (
    <>
      <div className="pt-4 text-sm font-arial">
        {isUserWhitelist ? `WHITELIST PRICE : ` : `PRICE : `}
        {isUserWhitelist ? whitelistPrice : publicPrice} ETH
      </div>
      <div className="pt-8 pb-4 text-center font-arial md:text-2xl">
        {"TOTAL : "}
        {isUserWhitelist ? whitelistPrice * quantity : publicPrice * quantity}
        {" ETH"}
      </div>
    </>
  );
};

export default ShowPrice;
