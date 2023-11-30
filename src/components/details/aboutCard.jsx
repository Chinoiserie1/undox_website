export default function AboutCard() {
  return (
    <div className="pb-4 sm:pb-10">
      <div className="w-full overflow-hidden border border-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-purple-600">ABOUT</h1>
          <ul className="ml-2 list-disc font-ligth">
            <li className="pt-3 text-white/70" style={{ textAlign: "justify" }}>
              <span className="font-semibold text-white/90">Type of Book:</span>{" "}
              Hardcover coffee table book.
            </li>
            <li className="pt-3 text-white/70" style={{ textAlign: "justify" }}>
              <span className="font-semibold text-white/90">
                Number of Pages:
              </span>{" "}
              204 pages.
            </li>
            <li className="pt-3 text-white/70" style={{ textAlign: "justify" }}>
              <span className="font-semibold text-white/90">
                Available Colors:
              </span>{" "}
              Black or Purple, both containing the same content.
            </li>
            <li className="pt-3 text-white/70" style={{ textAlign: "justify" }}>
              <span className="font-semibold text-white/90">
                Limited Edition:
              </span>{" "}
              200 NFT-Book copies.
            </li>
            <li className="pt-3 text-white/70" style={{ textAlign: "justify" }}>
              <span className="font-semibold text-white/90">
                Special NFT Offer:
              </span>{" "}
              Each NFT comes with a physical book.
            </li>
            <li className="pt-3 text-white/70" style={{ textAlign: "justify" }}>
              <span className="font-semibold text-white/90">
                Integrated Technology:
              </span>{" "}
              NFC chip embedded in the back cover.
            </li>
            <li className="pt-3 text-white/70" style={{ textAlign: "justify" }}>
              <span className="font-semibold text-white/90">
                Limited Book Edition:
              </span>{" "}
              Maximum of 500 copies in total.
            </li>
            <li className="pt-3 text-white/70" style={{ textAlign: "justify" }}>
              <span className="font-semibold text-white/90">Sales Method:</span>{" "}
              Offered on a first-come, first-served basis.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
