"use client";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { walletConnectProvider, EIP6963Connector } from "@web3modal/wagmi";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { mainnet, goerli } from "wagmi/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

// 1. Get projectId
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const chainUse = mainnet;

// 2. Create wagmiConfig
export const { chains, publicClient } = configureChains(
  [chainUse],
  [walletConnectProvider({ projectId }), publicProvider()]
);

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: { projectId, showQrModal: false, metadata },
    }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({
      chains,
      options: { appName: metadata.name },
    }),
  ],
  publicClient,
});

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, defaultChain: chainUse });

function WalletConnect({ children }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}

export default WalletConnect;
