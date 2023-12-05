const whitelistPrice = Number(process.env.NEXT_PUBLIC_WHITELIST_PRICE);
const publicPrice = Number(process.env.NEXT_PUBLIC_PUBLIC_PRICE);

const getMintValue = (
  status,
  quantityCover1,
  quantityCover2,
  isWhitelisted
) => {
  if (status == 1) {
    return 0;
  }
  if (status == 2) {
    return (quantityCover1 + quantityCover2) * whitelistPrice;
  }
  if (status == 3 && isWhitelisted) {
    return (quantityCover1 + quantityCover2) * whitelistPrice;
  }
  if (status == 3) {
    return (quantityCover1 + quantityCover2) * publicPrice;
  }
  return 0;
};

export default getMintValue;
