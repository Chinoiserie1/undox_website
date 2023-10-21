export default function Navbar() {
  return (
    <div className="flex items-start justify-between pt-10">
      <div className="flex items-start">
        <h1>UNDOXXED</h1>
      </div>
      <div className="flex items-end pl-4 space-x-4 sm:space-x-10 lg:space-x-20">
        <button>Preview</button>
        <button>Details</button>
        <button>Mint</button>
        <button>Event</button>
      </div>
    </div>
  );
}
