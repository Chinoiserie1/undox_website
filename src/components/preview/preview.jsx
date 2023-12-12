import FlipBook from "./flip-book";

export default function Preview() {
  return (
    <>
      <div className="text-center">
        <h1 className="inline-block px-10 py-5 text-3xl font-bold text-white uppercase md:text-4xl">
          book Preview
        </h1>
      </div>

      <FlipBook />
    </>
  );
}
