const MintInfo = () => {
  return (
    <>
      <div className="relative justify-between border-4 mt-14 md:flex border-ob-blackborder">
        <div className="absolute inset-x-0 top-0 z-10 hidden md:block bg-ob-blackborder h-14"></div>
        {/* <!-- Add timeselected className to select the right moment --> */}
        <div className="z-20 flex flex-col items-center justify-start flex-1 py-4 shrink-0 timeselected">
          <div className="flex items-center justify-center w-16 h-16 mx-auto text-3xl font-semibold border-4 rounded-full border-ob-blackbg bg-ob-blackborder circle">
            1
          </div>
          <div className="mt-5 text-xl font-extrabold text-center text-gray-400 uppercase title">
            Whitelist inscription
          </div>
          <div className="font-black text-center text-gray-500">
            01.12.2023 <span className="font-arial">-</span> 08:00pm
            <span className="font-arial">(</span>CET
            <span className="font-arial">)</span>
          </div>
          <div className="hidden w-10/12 h-1 mt-4 md:block bg-ob-blackborder separator"></div>
          <div className="px-4 mt-5 text-xl font-bold text-white uppercase">
            price: 0.01 ETH
          </div>
        </div>
        <div className="z-20 flex flex-col items-center justify-start flex-1 py-4 shrink-0">
          <div className="flex items-center justify-center w-16 h-16 mx-auto text-3xl font-semibold border-4 rounded-full border-ob-blackbg bg-ob-blackborder circle">
            2
          </div>
          <div className="mt-5 text-xl font-extrabold text-center text-gray-400 uppercase title">
            Private sale
          </div>
          <div className="font-black text-center text-gray-500">
            01.12.2023 <span className="font-arial">-</span> 08:00pm
            <span className="font-arial">(</span>CET
            <span className="font-arial">)</span>
          </div>
          <div className="hidden w-10/12 h-1 mt-4 md:block bg-ob-blackborder separator"></div>
          <div className="px-4 mt-5 text-xl font-bold text-white uppercase">
            price: 0.01 ETH
          </div>
        </div>
        <div className="z-20 flex flex-col items-center justify-start flex-1 py-4 pb-4 shrink-0">
          <div className="flex items-center justify-center w-16 h-16 mx-auto text-3xl font-semibold border-4 rounded-full border-ob-blackbg bg-ob-blackborder circle">
            3
          </div>
          <div className="mt-5 text-xl font-extrabold text-center text-gray-400 uppercase title">
            Pulic sale
          </div>
          <div className="font-black text-center text-gray-500">
            01.12.2023 <span className="font-arial">-</span> 08:00pm
            <span className="font-arial">(</span>CET
            <span className="font-arial">)</span>
          </div>
          <div className="hidden w-10/12 h-1 mt-4 md:block bg-ob-blackborder separator"></div>
          <div className="px-4 mt-5 text-xl font-bold text-white uppercase">
            price: 0.1 ETH
          </div>
        </div>
      </div>
    </>
  );
};

export default MintInfo;
