import Link from "next/link";
import Remaining from "./remaining";

const MintRedirection = () => {
  return (
    <div className="pt-10">
      <h1 className="pb-10 font-bold font-tt_moons">Mint</h1>
      <div className="flex flex-col justify-center">
        <Remaining />
        <Link className="flex justify-center w-full pt-4" href="/mint">
          <button className="w-1/2 px-4 py-2 text-xl font-bold text-white bg-black border border-white sm:w-1/4 hover:bg-white hover:text-black">
            MINT !
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MintRedirection;
