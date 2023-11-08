import Link from "next/link";

export default function Navbar({ previewRef, detailsRef, mintRef, eventRef }) {
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex items-start justify-between pt-10 sm:text-xl font-tt_moons">
      <div className="flex items-start">
        <h1>UNDOXXED</h1>
      </div>
      <div className="flex items-end pl-4 space-x-4 sm:space-x-10 lg:space-x-20">
        <Link href="#preview">
          <button
            className="hover:underline"
            onClick={() => scrollToSection(previewRef)}
          >
            Preview
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
        <Link href="#mint">
          <button
            className="hover:underline"
            onClick={() => scrollToSection(mintRef)}
          >
            Mint
          </button>
        </Link>
        <Link href="#event">
          <button
            className="hover:underline"
            onClick={() => scrollToSection(eventRef)}
          >
            Event
          </button>
        </Link>
      </div>
    </div>
  );
}
