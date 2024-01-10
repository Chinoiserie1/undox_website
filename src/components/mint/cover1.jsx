import useToken1Supply from "@/hooks/useToken1Supply";
import Image from "next/image";
import RemainingCard from "./remainingCard";
import useReservedToken1 from "@/hooks/useReservedToken1";

const cover1Img = "/images/cover/coverBlack.png";

const Cover1 = ({ approveMint, setQuantityCover1 }) => {
  const { token1Supply, isToken1SupplyError } = useToken1Supply();
  const { cover1Reserved } = useReservedToken1();

  return (
    <div className="w-full md:w-1/2">
      <div className="px-4 py-5 sm:p-6">
        <div className="relative">
          <Image
            src={cover1Img}
            alt="Cover1Image"
            width={224}
            height={267}
            className="w-full h-auto"
          />
        </div>
        <div className="pt-4">
          <p>Remaining Black</p>
          <RemainingCard
            tokenSupply={token1Supply}
            coverReserved={cover1Reserved}
            isTokenSupplyError={isToken1SupplyError}
          />
        </div>
      </div>
    </div>
  );
};

export default Cover1;
