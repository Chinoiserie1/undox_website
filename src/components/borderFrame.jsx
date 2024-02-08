"use client";
import useRedirectionMintPage from "@/hooks/useRedirectionMintPage";
import useCover1Supply from "@/hooks/useCover1SupplyPublicClient";
import useCover2Supply from "@/hooks/useCover2SupplyPublicClient";
import useCurrentStatus from "@/hooks/useCurrentStatusPublicClient";
import useMaxSupplyMintable from "@/hooks/useMaxSupplyMintable";

const whitelistPrice = process.env.NEXT_PUBLIC_WHITELIST_PRICE;
const publicPrice = process.env.NEXT_PUBLIC_PUBLIC_PRICE;

const BorderFrame = () => {
  const { cover1Supply } = useCover1Supply();
  const { cover2Supply } = useCover2Supply();
  const totalSupply = cover1Supply + cover2Supply;
  const { handleButtonClick } = useRedirectionMintPage();
  const { currentStatus } = useCurrentStatus();
  const { maxSupply } = useMaxSupplyMintable();

  const price = currentStatus == 2 ? whitelistPrice : publicPrice;

  return (
    <div>
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between h-12 mx-12 bg-ob-blackborder">
        <h1 className="text-2xl font-black text-white font-proxima">
          UNDOXXED
        </h1>
        <button
          onClick={handleButtonClick}
          className="px-4 py-1 font-bold text-black uppercase bg-white hover:bg-black hover:text-white"
        >
          mint
        </button>
      </div>
      <div className="fixed inset-y-0 right-0 z-50 flex items-center justify-center w-12 bg-ob-blackborder">
        <div className="text-gray-500 uppercase rotate-90 whitespace-nowrap">
          <span className="mr-2 font-extrabold">{publicPrice}</span> ETH
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center h-12 bg-ob-blackborder">
        <nav>
          <ul className="flex gap-10 font-bold text-gray-500 uppercase">
            <li className="hover:text-white">
              <a href="#preview"> preview </a>
            </li>
            <li className="hover:text-white">
              <a href="#mint"> mint </a>
            </li>
            <li className="hover:text-white">
              <a href="#details"> details </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="fixed inset-y-0 left-0 z-50 flex items-center justify-center w-12 bg-ob-blackborder">
        <div className="text-gray-500 uppercase -rotate-90 whitespace-nowrap">
          <span className="mr-2 font-extrabold font-arial">
            {totalSupply} <span className="font-arial">/</span> {maxSupply}
          </span>
          minted
        </div>
      </div>
    </div>
  );
};

export default BorderFrame;
