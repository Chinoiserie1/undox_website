export default function PriceSupplyCard() {
  return (
    <div className="py-4 sm:py-10">
      <div className="w-full overflow-hidden border border-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="font-bold font-proxima_bold">Price and supply</h1>
          <h1 className="pt-2 text-2xl font-bold font-proxima_bold">0.5 ETH</h1>
          <p className="pt-2 font-light font-proxima_reg text-white/70">
            Supply : 200
          </p>
        </div>
      </div>
    </div>
  );
}
