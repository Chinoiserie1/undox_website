import Mint from "@/components/mint/mint";
import MintLayout from "../app/mintLayout";
import WalletConnectDialog from "@/components/walletConnect/walletConnectDialog";
import SwitchChainDialog from "@/components/walletConnect/switchChainDialog";

export default function MintPage() {
  return (
    <div className="px-6 mx-auto text-xs max-w-7xl sm:px-20 lg:px-32 sm:text-base lg:text-lg">
      <MintLayout>
        <WalletConnectDialog />
        <SwitchChainDialog />
        <Mint />
      </MintLayout>
    </div>
  );
}
