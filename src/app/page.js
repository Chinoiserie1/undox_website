"use client";
import Navbar from "@/components/navbar";
import Preview from "@/components/preview/preview";
import Details from "@/components/details/details";
import Mint from "@/components/mint/mint";
import WalletConnect from "@/components/walletConnect/walletConnect";
import { useRef } from "react";

export default function Home() {
  const previewRef = useRef(null);
  const detailsRef = useRef(null);
  const mintRef = useRef(null);
  const eventRef = useRef(null);

  return (
    <div className="px-6 mx-auto text-xs max-w-7xl sm:px-20 lg:px-32 sm:text-base lg:text-lg">
      <Navbar
        previewRef={previewRef}
        detailsRef={detailsRef}
        mintRef={mintRef}
        eventRef={eventRef}
      />
      <section id="#preview" ref={previewRef}>
        <Preview />
      </section>
      <section id="#details" ref={detailsRef}>
        <Details />
      </section>
      <section id="#mint" ref={mintRef}>
        <WalletConnect>
          <Mint />
        </WalletConnect>
      </section>
      <section id="#event" ref={eventRef}>
        <div className="pt-8">Event incomming</div>
      </section>
    </div>
  );
}
