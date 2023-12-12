"use client";

import useRedirectionMintPage from "@/hooks/useRedirectionMintPage";

const MetaData = () => {
  const { handleButtonClick } = useRedirectionMintPage();
  return (
    <>
      <div className="px-20 pt-20 pb-32 lg:container lg:mx-auto lg:max-w-6xl">
        <div className="flex flex-col items-center justify-between md:flex-row gap-14">
          <div className="flex flex-col flex-1">
            <img className="w-full" src="media/COVERS_DUO_UNDX.png" alt="" />
          </div>
          <div className="flex flex-col items-start flex-1">
            <div className="flex justify-between w-full">
              <h1 className="inline-block px-4 py-2 text-2xl font-semibold text-white uppercase border-white md:text-3xl border-3">
                about
              </h1>
              <button
                onClick={handleButtonClick}
                className="inline-block px-4 py-2 text-2xl font-semibold uppercase bg-white hover:bg-black hover:text-white"
              >
                Buy
              </button>
            </div>
            <ul className="text-sm list-disc list-inside font-arial">
              <li className="pt-8 text-white/70">
                <span className="font-semibold uppercase text-white/90">
                  Hardcover coffee table book.
                </span>
                {/* Hardcover coffee table book. */}
              </li>
              <li className="pt-1.5 text-white/70">
                <span className="font-semibold uppercase text-white/90">
                  204 pages.
                </span>
                {/* 204 pages. */}
              </li>
              <li className="pt-1.5 text-white/70">
                <span className="font-semibold uppercase text-white/90">
                  Available in Black or Purple
                </span>
                {" both containing the same content."}
              </li>
              <li className="pt-1.5 text-white/70">
                <span className="font-semibold uppercase text-white/90">
                  Limited to 300 NFT-Book copies.
                </span>
                {/* 200 NFT-Book copies. */}
              </li>
              <li className="pt-1.5 text-white/70">
                <span className="font-semibold uppercase text-white/90">
                  Each NFT comes with a physical book.
                </span>
                {/* Each NFT comes with a physical book. */}
              </li>
              <li className="pt-1.5 text-white/70">
                <span className="font-semibold uppercase text-white/90">
                  NFC chip embedded in the back cover.
                </span>
                {/* NFC chip embedded in the back cover. */}
              </li>
              <li className="pt-1.5 text-white/70">
                <span className="font-semibold uppercase text-white/90">
                  Maximum of 500 copies in total.
                </span>
              </li>
              <li className="pt-1.5 text-white/70">
                <span className="font-semibold uppercase text-white/90">
                  Offered on a first-come, first-served basis.
                </span>
                {/* Offered on a first-come, first-served basis. */}
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-8 p-8 mt-10 md:flex-row bg-black/30">
          <div>
            <h1 className="text-2xl font-bold text-white md:text-5xl">
              ARTISTS
            </h1>
            <div className="text-sm font-extrabold text-purple-800">
              The book features a diverse array of talents and entities
            </div>
          </div>
          <div className="text-gray-400 grow">
            Adriana Hoppenbrouwer, Agoria, Antonio Talarico, Artisant, Ashumi
            Sanghvi, (B)APEVERSE, Big Xeus, Booyasan, Camille Louise Jewellery,
            Daniella Loftus, DegenToonz, HAPE, Hermine Bourdin, Hublot x Takashi
            Murakami, IoDF, Janey Park, Jeff Staple, John Trottier, LTD.Inc,
            Legitimate, Leila Ismailova, Marjorie Hernandez, Masnah, Megan
            Kaspar, Nicolas Romero, SinNominé, Tag Heuer, THEDEMATERIALISED, The
            Fabricant, Vanille Verloës R3N3GADES, VOLTZ, Xavier Magaldi, Xerak,
            Zaïd Kirdsey, _paperspace...
          </div>
        </div>
      </div>
    </>
  );
};

export default MetaData;
