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
    address: "0x2d308a424474e2632a7cc10c9a6791f3f1b7192f",
    abi: ABI.abi,
    functionName: "getCurrentStatus",
    onError: (err) => {
      console.error(err);
    },
  });

  useEffect(() => {
    if (contractReadStatus.data !== currentStatus) {
      setCurrentStatus(contractReadStatus.data);
      // Notify parent component about the status change
      onStatusChange(contractReadStatus.data);
    }
  }, [contractReadStatus.data, onStatusChange, currentStatus]);

  return (
    <div>
      <p>{currentStatus ? status[currentStatus] : status[0]}</p>
    </div>
  );
};

export default DisplayCurrentStatus;
