const statusList = {
  0: "Initialize",
  1: "allowlistMint",
  2: "whitelistMint",
  3: "mint",
  4: "End",
  5: "Pause",
};

const getFunctionName = (currentStatus, isWhitelisted) => {
  if (currentStatus === 3 && isWhitelisted) {
    return statusList[2];
  }
  if (currentStatus === 1 || currentStatus === 2 || currentStatus === 3) {
    return statusList[currentStatus];
  } else return statusList[1];
};

export default getFunctionName;
