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
    return <h2 className="font-bold">Error fetching status of the sale</h2>;
  }

  return (
    <h2 className="font-bold">
      Phase : {address ? statusList[status] : statusList[0]} Sale
    </h2>
  );
};

export default DisplayCurrentStatus;
