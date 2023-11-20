import { BoltIcon } from "@heroicons/react/24/outline";

export default function WhitelistCard() {
  return (
    <div className="w-full overflow-hidden border border-white shadow">
      <div className="px-4 py-5 sm:p-6">
        <h1 className="text-2xl font-bold text-purple-600">
          LAUNCH PHASES & PRICING
        </h1>
        {/* <div className="flex flex-row"> */}
        <BoltIcon className="w-4 h-4" />
        <h1 className="pt-3 font-bold">WHITELIST MINT</h1>
        {/* </div> */}
        <h1 className="text-2xl font-bold">05.12.2023</h1>
        <p className="font-light text-white/70">8pm (CET)</p>
        <p className="font-light text-white/70">Price: 150 €uros</p>
        <h1 className="pt-4 font-bold">PUBLIC MINT</h1>
        <h1 className="text-2xl font-bold">06.12.2023</h1>
        <p className="font-light text-white/70">8pm (CET)</p>
        <p className="font-light text-white/70">Price: 200 €uros</p>
      </div>
    </div>
  );
}
