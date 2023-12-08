import FlipBook from "./flip-book";

export default function Preview() {
  return (
    <>
      <div className="text-center">
        <h1 className="inline-block px-10 py-5 text-3xl font-bold text-white uppercase border-white md:text-4xl border-3">
          Preview
        </h1>
      </div>

      <FlipBook />
    </>
  );
}
