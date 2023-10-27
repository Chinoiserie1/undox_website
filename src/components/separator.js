import { useState, useEffect, useRef } from "react";

const Divider = () => {
  const containerRef = useRef(null);
  const [numberOfXs, setNumberOfXs] = useState(10); // Initial number of 'X' characters

  useEffect(() => {
    const handleResize = () => {
      // Get the width of the container
      const containerWidth = containerRef.current.offsetWidth;

      // Calculate the number of 'X' characters based on the container width
      const newXCount = Math.floor(containerWidth / 20); // Change 50 to your desired width for each 'X' character
      setNumberOfXs(newXCount);
    };

    // Update the number of 'X' characters on initial render and when the container size changes
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures that this effect runs only once after the initial render

  return (
    <div ref={containerRef} className="flex items-center justify-center w-full">
      {Array.from({ length: numberOfXs }, (_, index) => (
        <div key={index} className="text-white/40">
          X
        </div>
      ))}
    </div>
  );
};

export default Divider;
