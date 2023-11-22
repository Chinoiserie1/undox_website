import useCurrentStatus from "@/hooks/useCurrentStatus";
import { useAccount } from "wagmi";

const statusList = {
  0: "Initialize",
  1: "Allowlist",
  2: "Whitelist",
  3: "Public",
  4: "End",
  5: "Pause",
};

const DisplayCurrentStatus = () => {
  const { address } = useAccount();
  const { status, isStatusError } = useCurrentStatus();

  if (isStatusError && address) {
    return (
      <div>
        <p>Error fetching status of the sale</p>
      </div>
    );
  }

  return (
    <div>
      <p>{address ? statusList[status] : statusList[0]}</p>
    </div>
  );
};

export default DisplayCurrentStatus;
