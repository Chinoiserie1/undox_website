"use client";
import useRedirectionMintPage from "@/hooks/useRedirectionMintPage";
import MintInfo from "./mintInfo";
import useCover1Supply from "@/hooks/useCover1SupplyPublicClient";
import useCover2Supply from "@/hooks/useCover2SupplyPublicClient";
import useCurrentStatus from "@/hooks/useCurrentStatusPublicClient";
import useMaxSupplyMintable from "@/hooks/useMaxSupplyMintable";
import useAllQuantityMinted from "@/hooks/useAllQuantityMinted";

const whitelistPrice = process.env.NEXT_PUBLIC_WHITELIST_PRICE;
const publicPrice = process.env.NEXT_PUBLIC_PUBLIC_PRICE;

const MintSection = () => {
  const { cover1Supply } = useCover1Supply();
  const { cover2Supply } = useCover2Supply();
  const totalSupply = cover1Supply + cover2Supply;
  const { handleButtonClick } = useRedirectionMintPage();
  const { currentStatus } = useCurrentStatus();
  const { maxSupply } = useMaxSupplyMintable();
  const { allQuantityMinted } = useAllQuantityMinted();

  const price = currentStatus == 2 ? whitelistPrice : publicPrice;

  return (
    <>
      <div id="mint" className="mt-14 h-0.5 w-full bg-white"></div>
      <div className="flex flex-col items-center justify-between mt-14 md:flex-row">
        <div className="flex flex-col gap-4 md:flex-2">
          <div className="flex items-center gap-4 md:order-2">
            <div className="text-7xl md:text-[200px] text-white font-black">
              {allQuantityMinted ? maxSupply : totalSupply}
            </div>
            <div className="text-xs font-bold text-gray-500 uppercase">
              <div className="mb-1 text-2xl md:text-[43px] font-semibold">
                <span className="font-arial">/</span> 300
              </div>
              already minted
            </div>
          </div>
          <h1 className="font-extrabold text-center text-white uppercase md:order-1 md:text-2xl">
            Mint the nft,{" "}
            <span className="md:hidden">
              <br />
            </span>{" "}
            get the physical book
          </h1>
        </div>
        <button
          onClick={handleButtonClick}
          className="w-full py-5 mt-10 text-6xl font-black uppercase bg-white md:w-1/3 md:py-16 md:px-20 md:mt-0 hover:bg-black hover:text-white"
        >
          <span className="text-4xl">
            {price} ETH <br />
          </span>
          buy
        </button>
      </div>
      <MintInfo />
    </>
  );
};

export default MintSection;
