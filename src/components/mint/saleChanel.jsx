// const SaleChanel = ({ select, setSelected }) => {
//   return (
//     <div className="relative justify-between border-4 md:flex border-ob-blackborder">
//       <div className="absolute inset-x-0 top-0 z-10 hidden md:block bg-ob-blackborder h-14"></div>
//       {/* <!-- Add timeselected className to select the right moment --> */}
//       <div
//         className={`z-20 flex flex-col items-center justify-start flex-1 py-4 shrink-0 ${
//           select == 0 ? "timeselected" : ""
//         }`}
//         onClick={() => setSelected(0)}
//       >
//         <div className="flex items-center justify-center w-16 h-16 mx-auto text-3xl font-semibold text-black border-4 rounded-full border-ob-blackbg bg-ob-blackborder circle">
//           1
//         </div>
//         <div className="mt-5 text-xl font-extrabold text-center text-gray-400 uppercase title">
//           shipping informations
//         </div>
//         <div class="hidden w-10/12 h-1 mt-4 md:block bg-ob-blackborder separator"></div>
//       </div>
//       <div
//         className={`z-20 flex flex-col items-center justify-start flex-1 py-4 shrink-0 ${
//           select == 1 ? "timeselected" : ""
//         }`}
//         onClick={() => setSelected(1)}
//       >
//         <div className="flex items-center justify-center w-16 h-16 mx-auto text-3xl font-semibold text-black border-4 rounded-full border-ob-blackbg bg-ob-blackborder circle">
//           2
//         </div>
//         <div className="mt-5 text-xl font-extrabold text-center text-gray-400 uppercase title">
//           mint
//         </div>
//         <div class="hidden w-10/12 h-1 mt-4 md:block bg-ob-blackborder separator"></div>
//       </div>
//     </div>
//   );
// };

// export default SaleChanel;

import { useState } from "react";

const SaleChanel = ({ select, setSelected }) => {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  return (
    <div className="relative justify-between border-4 md:flex border-ob-blackborder">
      <div className="absolute inset-x-0 top-0 z-10 hidden md:block bg-ob-blackborder h-14"></div>

      <div
        className={`z-20 flex flex-col items-center justify-start flex-1 py-4 shrink-0 ${
          select === 0 ? "timeselected" : ""
        }`}
        onClick={() => setSelected(0)}
        onMouseEnter={() => setIsHovered1(true)}
        onMouseLeave={() => setIsHovered1(false)}
      >
        <div className="flex items-center justify-center w-16 h-16 mx-auto text-3xl font-semibold text-black border-4 rounded-full border-ob-blackbg bg-ob-blackborder circle">
          1
        </div>
        <div className="mt-5 text-xl font-extrabold text-center text-gray-400 uppercase title">
          shipping informations
        </div>
        {(isHovered1 || select == 0) && (
          <div className="w-10/12 h-1 mt-4 md:block bg-ob-blackborder separator"></div>
        )}
      </div>

      <div
        className={`z-20 flex flex-col items-center justify-start flex-1 py-4 shrink-0 ${
          select === 1 ? "timeselected" : ""
        }`}
        onClick={() => setSelected(1)}
        onMouseEnter={() => setIsHovered2(true)}
        onMouseLeave={() => setIsHovered2(false)}
      >
        <div className="flex items-center justify-center w-16 h-16 mx-auto text-3xl font-semibold text-black border-4 rounded-full border-ob-blackbg bg-ob-blackborder circle">
          2
        </div>
        <div className="mt-5 text-xl font-extrabold text-center text-gray-400 uppercase title">
          mint
        </div>
        {(isHovered2 || select == 1) && (
          <div className="w-10/12 h-1 mt-4 md:block bg-ob-blackborder separator"></div>
        )}
      </div>
    </div>
  );
};

export default SaleChanel;
