import { useContractRead } from "wagmi";
import ABI from "@/app/contract/abi/UNDOXXED.json";
import { useState, useEffect } from "react";

const DisplayCurrentStatus = ({ onStatusChange }) => {
  const [currentStatus, setCurrentStatus] = useState(0);

  const status = {
    0: "Initialize",
    1: "Allowlist",
    2: "Whitelist",
    3: "Public",
    4: "End",
    5: "Pause",
  };

  const contractReadStatus = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI.abi,
    functionName: "getCurrentStatus",
    onError: (err) => {
      console.error(err);
    },
  });

  useEffect(() => {
    if (
      contractReadStatus.data !== currentStatus &&
      contractReadStatus.data != undefined
    ) {
      setCurrentStatus(contractReadStatus.data);
      // Notify parent component about the status change
      onStatusChange(contractReadStatus.data);
    }
  }, [contractReadStatus.data, onStatusChange, currentStatus]);

  return (
    <div className="font-tt_moons">
      <p>{currentStatus ? status[currentStatus] : status[0]}</p>
    </div>
  );
};

export default DisplayCurrentStatus;
