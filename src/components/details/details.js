import AboutCard from "./aboutCard";
import ArtistsCard from "./artistsCard";
import DateCard from "./dateCard";
import PriceSupplyCard from "./priceSupplyCard";

export default function Details() {
  return (
    <div className="pt-10">
      <h1 className="font-bold font-tt_moons">Details</h1>
      <div className="flex flex-col pt-10 sm:flex-row">
        <AboutCard />
        <div className="flex flex-col pt-4 sm:w-1/2 sm:pt-0 sm:pl-10">
          {/* <div className="w-full overflow-hidden border border-white shadow"> */}
          <DateCard />
          <PriceSupplyCard />
          <ArtistsCard />
        </div>
      </div>
    </div>
  );
}
