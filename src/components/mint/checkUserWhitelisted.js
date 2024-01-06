import Whitelist from "@/app/contract/whitelist/whitelist.json";

export const isAllowlisted = (address) => {
  let infos = {
    isAllowlisted: false,
    signature: "",
    cover1: 0,
    cover2: 0,
  };
  if (!address) return infos;
  const allowlist = Whitelist.allowlist;
  for (let i = 0; i < allowlist.length; i++) {
    if (allowlist[i].address == address) {
      infos.isAllowlisted = true;
      infos.signature = allowlist[i].signature;
      infos.cover1 = allowlist[i].amountCover1;
      infos.cover2 = allowlist[i].amountCover2;
      return infos;
    }
  }
  return infos;
};

export const isWhitelisted = (address) => {
  let infos = {
    isWhitelisted: false,
    signature: "",
    cover1: 0,
    cover2: 0,
  };
  if (!address) return infos;
  const whitelist = Whitelist.whitelist;
  for (let i = 0; i < whitelist.length; i++) {
    if (whitelist[i].address == address) {
      infos.isWhitelisted = true;
      infos.signature = whitelist[i].signature;
      infos.cover1 = whitelist[i].amountCover1;
      infos.cover2 = whitelist[i].amountCover2;
      return infos;
    }
  }
  return infos;
};

export const isPrivateWhitelisted = (address) => {
  let infos = {
    isPrivateWhitelisted: false,
    signature: "",
    cover1: 0,
    cover2: 0,
  };
  if (!address) return infos;
  const whitelist = Whitelist.private;
  for (let i = 0; i < whitelist.length; i++) {
    if (whitelist[i].address == address) {
      infos.isPrivateWhitelisted = true;
      infos.signature = whitelist[i].signature;
      infos.cover1 = whitelist[i].amountCover1;
      infos.cover2 = whitelist[i].amountCover2;
      return infos;
    }
  }
  return infos;
};

const checkUserWhitelisted = (address, currentStatus) => {
  let res = {
    success: false,
    status: currentStatus,
    signature: "",
    cover1: 0,
    cover2: 0,
  };
  switch (currentStatus) {
    case 1:
      const allowlist = Whitelist.allowlist;
      for (let i = 0; i < allowlist.length; i++) {
        if (allowlist[i].address == address) {
          res.success = true;
          res.status = currentStatus;
          res.signature = allowlist[i].signature;
          res.cover1 = allowlist[i].amountCover1;
          res.cover2 = allowlist[i].amountCover2;
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
          res.cover2 = whitelist[i].amountCover2;
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
