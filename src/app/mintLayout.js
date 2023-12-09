import "./styles.css";
import "./tailwind.css";
import WalletConnect from "@/components/walletConnect/walletConnect";

export default function MintLayout({ children }) {
  return <WalletConnect>{children}</WalletConnect>;
}
