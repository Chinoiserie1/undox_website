import UndoxxedBookVol1Card from "./undoxxedBookVol1Card";
import ArtistsCard from "./artistsCard";
import WhitelistCard from "./whitelistCard";
import AboutCard from "./aboutCard";
import PhasePricingCard from "./phasePricingCard";

export default function Details() {
  return (
    <div className="pt-10">
      <h1 className="font-bold font-[TTMoons]">DETAILS</h1>
      <div className="pt-10" />
      <PhasePricingCard />
      <div className="flex flex-col pt-10 sm:flex-row">
        <UndoxxedBookVol1Card />
        <div className="flex flex-col pt-4 sm:w-1/2 sm:pt-0 sm:pl-10">
          {/* <div className="w-full overflow-hidden border border-white shadow"> */}
          {/* <WhitelistCard /> */}
          <AboutCard />
          <ArtistsCard />
        </div>
      </div>
    </div>
  );
}
