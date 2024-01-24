"use client";
import Mint from "@/components/mint/mint";
import MintLayout from "../app/mintLayout";
import WalletConnectDialog from "@/components/walletConnect/walletConnectDialog";
import SwitchChainDialog from "@/components/walletConnect/switchChainDialog";
import ClientOnly from "@/components/walletConnect/clientOnly";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function MintPage() {
  return (
    <>
      <div className="text-white bg-ob-blackbg">
        <div className="px-6 mx-auto mb-10 text-xs max-w-7xl md:px-20 lg:px-32 md:text-base lg:text-lg">
          <QueryClientProvider client={queryClient}>
            <ClientOnly>
              <MintLayout>
                <WalletConnectDialog />
                <SwitchChainDialog />
                <Mint />
              </MintLayout>
            </ClientOnly>
          </QueryClientProvider>
        </div>
      </div>
      <script
        src="https://embed.small.chat/T06DC8L1BBNC06DC9KL9LL.js"
        async
      ></script>
    </>
  );
}
