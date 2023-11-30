import { BoltIcon } from "@heroicons/react/24/outline";

export default function PhasePricingCard() {
  return (
    <div className="border border-white shadow w-fulloverflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h1 className="text-2xl font-bold text-center text-purple-600">
          LAUNCH PHASES & PRICING
        </h1>
        <div className="flex flex-col items-center py-4 sm:flex-row sm:items-start">
          <div className="flex flex-col items-center w-1/2">
            {/* <BoltIcon className="w-4 h-4" /> */}
            <h1 className="pt-3 font-bold">WHITELIST MINT</h1>
            <h1 className="text-2xl font-bold">13.12.2023</h1>
            <p className="font-light text-white/70">8pm (CET)</p>
            <p className="font-light text-white/70">Price: 150 €uros</p>
          </div>
          <div className="flex flex-col items-center w-1/2">
            <h1 className="pt-4 font-bold">PUBLIC MINT</h1>
            <h1 className="text-2xl font-bold">14.12.2023</h1>
            <p className="font-light text-white/70">8pm (CET)</p>
            <p className="font-light text-white/70">Price: 200 €uros</p>
          </div>
        </div>
      </div>
    </div>
  );
}
