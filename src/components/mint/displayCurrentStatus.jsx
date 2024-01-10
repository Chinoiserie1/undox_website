import useCurrentStatus from "@/hooks/useCurrentStatus";
import { useAccount } from "wagmi";

const statusList = {
  0: "Initialize",
  1: "Allowlist",
  2: "WHITELIST SALE",
  3: "PUBLIC SALE",
  4: "End",
  5: "Pause",
};

const DisplayCurrentStatus = () => {
  const { address } = useAccount();
  const { status, isStatusError } = useCurrentStatus();

  if (isStatusError && address) {
    return <h1 className="font-bold">Error fetching status of the sale</h1>;
  }

  return <h1 className="font-bold">WHITELIST SALE</h1>;
};

export default DisplayCurrentStatus;
