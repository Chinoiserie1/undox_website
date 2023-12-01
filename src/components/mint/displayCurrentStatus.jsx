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
      <div className="font-[TTMoons]">
        <p>Error fetching status of the sale</p>
      </div>
    );
  }

  return (
    <div className="font-[TTMoons]">
      <p>Phase : {address ? statusList[status] : statusList[0]} Sale</p>
    </div>
  );
};

export default DisplayCurrentStatus;
