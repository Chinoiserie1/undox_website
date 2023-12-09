// import { useState } from "react";
import Image from "next/image";
import RemainingCard from "./remainingCard";
import useToken2Supply from "@/hooks/useToken2Supply";

const cover2Img = "/images/cover/coverPurple.png";

const Cover2 = ({ approveMint, setQuantityCover2 }) => {
  const { token2Supply, isToken2SupplyError } = useToken2Supply();

  return (
    <div className="w-full sm:w-1/4">
      <div className="px-4 py-5 sm:p-6">
        <Image
          src={cover2Img}
          alt="Cover2Image"
          width={224}
          height={267}
          className="w-full h-auto"
        />
        <div className="pt-4">
          <p>Remaining Purple</p>
          <RemainingCard
            tokenSupply={token2Supply}
            isTokenSupplyError={isToken2SupplyError}
          />
        </div>
      </div>
    </div>
  );
};

export default Cover2;
