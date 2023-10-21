import Navbar from "@/components/navbar";
import Preview from "@/components/preview/preview";
import Details from "@/components/details/details";
import Mint from "@/components/mint/mint";
import WalletConnect from "@/components/walletConnect/walletConnect";

export default function Home() {
  return (
    <div className="px-6 mx-auto text-xs max-w-7xl sm:px-20 lg:px-32 sm:text-base lg:text-lg">
      <Navbar />
      <Preview />
      <Details />
      <WalletConnect>
        <Mint />
      </WalletConnect>
    </div>
  );
}
