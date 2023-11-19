import { useContractRead } from "wagmi";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useState, useEffect } from "react";
import useCurrentStatus from "@/hooks/useCurrentStatus";

const statusList = {
  0: "Initialize",
  1: "Allowlist",
  2: "Whitelist",
  3: "Public",
  4: "End",
  5: "Pause",
};

const DisplayCurrentStatus = () => {
  const { status, isStatusError } = useCurrentStatus;

  if (isStatusError) {
    return (
      <div className="font-tt_moons">
        <p>Error fetching status of the sale</p>
      </div>
    );
  }

  return (
    <div className="font-tt_moons">
      <p>{status ? statusList[status] : statusList[0]}</p>
    </div>
  );
};

export default DisplayCurrentStatus;
