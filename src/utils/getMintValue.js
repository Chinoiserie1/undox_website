const whitelistPrice = 0.001;
const publicPrice = 0.0015;

const getMintValue = (status, quantityCover1, quantityCover2) => {
  if (status == 1) {
    return 0;
  }
  if (status == 2) {
    return (quantityCover1 + quantityCover2) * whitelistPrice;
  }
  if (status == 3) {
    return (quantityCover1 + quantityCover2) * publicPrice;
  }
  return 0;
};

export default getMintValue;
