"use client";
import Navbar from "@/components/navbar";
import Preview from "@/components/preview/preview";
import Details from "@/components/details/details";
import Mint from "@/components/mint/mint";
import WalletConnect from "@/components/walletConnect/walletConnect";
import { useContext, useRef } from "react";
import Divider from "@/components/separator";
import SectionContext from "@/components/sectionContext";
import WalletConnectDialog from "@/components/walletConnect/walletConnectDialog";

// pop up MINT - connect wallet
// Only. ETH
// Submit to MINT

export default function Home() {
  const { previewRef, detailsRef, mintRef } = useContext(SectionContext);

  return (
    <div className="px-6 mx-auto text-xs max-w-7xl sm:px-20 lg:px-32 sm:text-base lg:text-lg">
      <WalletConnect>
        <Navbar />
        <WalletConnectDialog />
        <section id="#preview" ref={previewRef}>
          <Preview />
        </section>
        <div className="pt-4">
          <Divider />
        </div>
        <section id="#details" ref={detailsRef}>
          <Details />
        </section>
        <div className="pt-10">
          <Divider />
        </div>
        <section id="#mint" ref={mintRef}>
          <Mint />
        </section>
      </WalletConnect>
    </div>
  );
}
