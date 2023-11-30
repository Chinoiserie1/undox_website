import useToken1Supply from "@/hooks/useToken1Supply";
import Image from "next/image";
import RemainingCard from "./remainingCard";

const cover1Img = "/images/cover/coverBlack.png";

const Cover1 = ({ approveMint, setQuantityCover1 }) => {
  const { token1Supply, isToken1SupplyError } = useToken1Supply();

  return (
    <div className="w-full sm:w-1/2">
      <div className="px-4 py-5 sm:p-6">
        <div className="relative">
          <Image
            src={cover1Img}
            alt="Cover1Image"
            width={224 * 3}
            height={267 * 3}
          />
        </div>
        <div className="pt-4">
          <p>Remaining Black</p>
          <RemainingCard
            tokenSupply={token1Supply}
            isTokenSupplyError={isToken1SupplyError}
          />
        </div>
      </div>
    </div>
  );
};

export default Cover1;
