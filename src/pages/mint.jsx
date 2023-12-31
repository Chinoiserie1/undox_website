import Mint from "@/components/mint/mint";
import MintLayout from "../app/mintLayout";
import WalletConnectDialog from "@/components/walletConnect/walletConnectDialog";
import SwitchChainDialog from "@/components/walletConnect/switchChainDialog";
import ClientOnly from "@/components/walletConnect/clientOnly";

export default function MintPage() {
  return (
    <div className="text-white bg-ob-blackbg">
      <div className="px-6 mx-auto mb-10 text-xs max-w-7xl md:px-20 lg:px-32 md:text-base lg:text-lg">
        <ClientOnly>
          <MintLayout>
            <WalletConnectDialog />
            <SwitchChainDialog />
            <Mint />
          </MintLayout>
        </ClientOnly>
      </div>
    </div>
  );
}
