export default function AboutCard() {
  return (
    <div className="pb-4 sm:pb-10">
      <div className="w-full overflow-hidden border border-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-purple-600">ABOUT</h1>
          <ul className="ml-2 list-disc">
            <li
              className="pt-3 font-light text-white/70"
              style={{ textAlign: "justify" }}
            >
              Type of Book: Hardcover coffee table book.
            </li>
            <li
              className="pt-3 font-light text-white/70"
              style={{ textAlign: "justify" }}
            >
              Number of Pages: 204 pages.
            </li>
            <li
              className="pt-3 font-light text-white/70"
              style={{ textAlign: "justify" }}
            >
              Available Colors: Black or Purple, both containing the same
              content.
            </li>
            <li
              className="pt-3 font-light text-white/70"
              style={{ textAlign: "justify" }}
            >
              Limited Edition: 200 NFT-Book copies.
            </li>
            <li
              className="pt-3 font-light text-white/70"
              style={{ textAlign: "justify" }}
            >
              Special NFT Offer: Each NFT comes with a physical book.
            </li>
            <li
              className="pt-3 font-light text-white/70"
              style={{ textAlign: "justify" }}
            >
              Integrated Technology: NFC chip embedded in the back cover.
            </li>
            <li
              className="pt-3 font-light text-white/70"
              style={{ textAlign: "justify" }}
            >
              Limited Book Edition: Maximum of 500 copies in total.
            </li>
            <li
              className="pt-3 font-light text-white/70"
              style={{ textAlign: "justify" }}
            >
              Sales Method: Offered on a first-come, first-served basis.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
