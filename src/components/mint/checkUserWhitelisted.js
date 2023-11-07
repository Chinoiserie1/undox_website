import Whitelist from "@/app/contract/whitelist/whitelist.json";

const checkUserWhitelisted = (address, currentStatus) => {
  let res = {
    success: false,
    status: currentStatus,
    signature: "",
    cover1: 0,
    cover2: 0,
  };
  console.log("currentStatus == " + currentStatus);
  switch (currentStatus) {
    case 1:
      const allowlist = Whitelist.allowlist;
      for (let i = 0; i < allowlist.length; i++) {
        if (allowlist[i].address == address) {
          res.success = true;
          res.status = currentStatus;
          res.signature = allowlist[i].signature;
          res.cover1 = allowlist[i].amountCover1;
          res.cover2 = allowlist[i].amountCover1;
          // return res;
        }
      }
      return res;
    case 2:
      const whitelist = Whitelist.whitelist;
      for (let i = 0; i < whitelist.length; i++) {
        if (whitelist[i].address == address) {
          res.success = true;
          res.status = currentStatus;
          res.signature = whitelist[i].signature;
          res.cover1 = whitelist[i].amountCover1;
          res.cover2 = whitelist[i].amountCover1;
        }
      }
      return res;
    case 3:
      res.success = true;
      return res;
    default:
      return res;
  }
};

export default checkUserWhitelisted;
