"use client";
import useRedirectionMintPage from "@/hooks/useRedirectionMintPage";

const DetailSection = () => {
  const { handleButtonClick } = useRedirectionMintPage();
  return (
    <>
      <div id="details" className="mt-24 bg-black py-36">
        <div className="flex flex-col items-center px-20 overflow-hidden lg:container lg:mx-auto lg:max-w-6xl md:flex-row gap-x-14">
          <div className="flex-1">
            <h1 className="text-4xl font-black text-white uppercase md:!text-6xl">
              Undoxxed book Vol1
            </h1>
            <div className="text-lg font-bold text-purple-700">
              <a className="hover:text-purple-300" href="#">
                Mint the NFT, Get the Physical Book
              </a>
            </div>

            <p className="mt-4 text-white text-adjusted">
              Undoxxed is the first book focuses on
              <span className="italic">
                The Finest in Digital Lifestyle Culture
              </span>
              , and covers a wide array of subjects, including fashion,
              streetwear, sneakers, street art, design and tech. Furthermore, it
              delves into the entire digital fashion ecosystem where street
              culture & lifestyle merge to Web3 <br />
              <br />A critical aspect of this book is to emphasize the bridge
              between In-Virtual-Life (IVL) and In-Real-Life
              <span className="font-arial">(IRL)</span> assets. This theme
              <span className="font-arial"> &quot;phygital&quot;</span> is
              prominently reflected in the editorial content, subject selection,
              and the highlighting of physical elements.
              <br />
              <br />
              The approach of this book is purely editorial, and that there are
              no advertising or payd content. The Undoxxed team acts as as
              <span className="font-arial"> &quot;curator&quot;</span>, seeking
              out brands, Web3 projects, designer-creators, and artists who, in
              their judgment, are at the forefront of the fashion and lifestyle
              ecosystem of the future. These individuals and entities are chosen
              based on editorial criteria.
              <br />
              <br />
              <span className="font-bold">
                The content featured in this book signifies a significant era
                and a shift in how fashion is created, consumed, and
                experienced. It is a responsibility to document and archive this
                transformation, which is why{" "}
                <span className="font-bold">UNDOXXED</span> has come into
                existence.
              </span>
            </p>
          </div>
          <div className="relative flex-1">
            <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 hover:opacity-90 bg-purple-700/80">
              <button
                onClick={handleButtonClick}
                className="py-5 mt-10 text-6xl font-black uppercase bg-white md:py-16 md:px-20 md:mt-0 hover:bg-black hover:text-white"
              >
                buy
              </button>
            </div>
            <video
              className="w-full px-12 rounded-lg md:-mt-40 md:px-0"
              autoPlay
              loop
              poster="./img/btc_cuve.png"
              preload="auto"
              muted
              playsInline
              defaultmuted=""
            >
              <source src="/media/UNDOXXED_Purple.mp4" type="video/mp4" />
              Your browser does not support MP4 format.
            </video>
            <ul className="inset-x-0 flex flex-wrap items-center justify-center md:absolute -bottom-10 gap-x-4 gap-y-2">
              <li className="px-2 py-1 text-sm font-bold text-purple-800 uppercase bg-purple-800 rounded-full bg-opacity-20">
                sneakers
              </li>
              <li className="px-2 py-1 text-sm font-bold text-purple-800 uppercase bg-purple-800 rounded-full bg-opacity-20">
                Streetwear
              </li>
              <li className="px-2 py-1 text-sm font-bold text-purple-800 uppercase bg-purple-800 rounded-full bg-opacity-20">
                Phygital
              </li>
              <li className="px-2 py-1 text-sm font-bold text-purple-800 uppercase bg-purple-800 rounded-full bg-opacity-20">
                AR
              </li>
              <li className="px-2 py-1 text-sm font-bold text-purple-800 uppercase bg-purple-800 rounded-full bg-opacity-20">
                Wearable
              </li>
              <li className="px-2 py-1 text-sm font-bold text-purple-800 uppercase bg-purple-800 rounded-full bg-opacity-20">
                Toys
              </li>
              <li className="px-2 py-1 text-sm font-bold text-purple-800 uppercase bg-purple-800 rounded-full bg-opacity-20">
                Skate
              </li>
              <li className="px-2 py-1 text-sm font-bold text-purple-800 uppercase bg-purple-800 rounded-full bg-opacity-20">
                NFT
              </li>
              <li className="px-2 py-1 text-sm font-bold text-purple-800 uppercase bg-purple-800 rounded-full bg-opacity-20">
                Digital
              </li>
              <li className="px-2 py-1 text-sm font-bold text-purple-800 uppercase bg-purple-800 rounded-full bg-opacity-20">
                Fashion
              </li>
              <li className="px-2 py-1 text-sm font-bold text-purple-800 uppercase bg-purple-800 rounded-full bg-opacity-20">
                Collectible
              </li>
              <li className="px-2 py-1 text-sm font-bold text-purple-800 uppercase bg-purple-800 rounded-full bg-opacity-20">
                Street
              </li>
              <li className="px-2 py-1 text-sm font-bold text-purple-800 uppercase bg-purple-800 rounded-full bg-opacity-20">
                Art
              </li>
              <li className="px-2 py-1 text-sm font-bold text-purple-800 uppercase bg-purple-800 rounded-full bg-opacity-20">
                Jewelry
              </li>
              <li className="px-2 py-1 text-sm font-bold text-purple-800 uppercase bg-purple-800 rounded-full bg-opacity-20">
                Design & Tech
              </li>
              <li className="px-2 py-1 text-sm font-bold text-purple-800 uppercase bg-purple-800 rounded-full bg-opacity-20">
                3D printing
              </li>
              <li className="px-2 py-1 text-sm font-bold text-purple-800 uppercase bg-purple-800 rounded-full bg-opacity-20">
                Digital identity
              </li>
              <li className="px-2 py-1 text-sm font-bold text-purple-800 uppercase bg-purple-800 rounded-full bg-opacity-20">
                Digital experience
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailSection;
