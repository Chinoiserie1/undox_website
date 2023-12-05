import Link from "next/link";
import SectionContext from "./sectionContext";
import { useContext } from "react";

export default function Navbar() {
  const { previewRef, detailsRef, mintRef, scrollToSection } =
    useContext(SectionContext);

  return (
    <div className="flex items-start justify-between pt-10 text-lg sm:text-2xl font-tt_moons lg:text-3xl">
      <div className="flex items-start font-[arial]">
        <h1>UNDOXXED</h1>
      </div>
      <div className="flex items-end pl-4 space-x-3 sm:space-x-10 lg:space-x-20 font-[TTMoons]">
        <Link href="#preview">
          <button
            className="hover:underline"
            onClick={() => scrollToSection(previewRef)}
          >
            Preview
          </button>
        </Link>
        <Link href="#mint">
          <button
            className="hover:underline"
            onClick={() => scrollToSection(mintRef)}
          >
            Mint
          </button>
        </Link>
        <Link href="#details">
          <button
            className="hover:underline"
            onClick={() => scrollToSection(detailsRef)}
          >
            Details
          </button>
        </Link>
      </div>
    </div>
  );
}
