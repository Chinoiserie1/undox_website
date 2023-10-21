export default function AboutCard() {
  return (
    <div className="w-full overflow-hidden border border-white shadow sm:w-2/4">
      <div className="px-4 py-5 sm:p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/page3.JPG" alt="image about" />
        <h1 className="pt-4 font-bold">About</h1>
        <p className="pt-4 font-light text-white/70">
          We are thrilled to announce an exciting opportunity to showcase your
          artistic skills and make a lasting impact on the upcoming book
          “UNDOXXED” – a captivating exploration of “The Finest in Digital
          Lifestyle Culture”. We are seeking a captivating and visually striking
          design that encapsulates the essence of “UNDOXXED” and its exploration
          of digital culture for the cover, spine, and back of the book. This is
          an exceptional opportunity to leave your artistic imprint on a
          significant publication that will resonate with enthusiasts worldwide.
        </p>
      </div>
    </div>
  );
}
