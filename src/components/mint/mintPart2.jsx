import { useState, useEffect, useContext } from "react";
import { useAccount } from "wagmi";

import { getShippingInfo } from "@/app/api/getShippingInfo";
import { CheckoutWithCard } from "@paperxyz/react-client-sdk";

import checkUserWhitelisted, {
  isWhitelisted,
  isPrivateWhitelisted,
} from "./checkUserWhitelisted";
import Remaining from "./remaining";
import MintSuccess from "./mintSuccess";
import TransactionSubmited from "./transactionSubmit";
import Cover1 from "./cover1";
import Cover2 from "./cover2";
import ErrorDialog from "./errorDialog";
import ErrorNotification from "./errorNotification";
import SelectQuantity from "./selectQuantity";
import SelectCover from "./selectCover";
import useCurrentStatus from "@/hooks/useCurrentStatus";
import useAllQuantityMinted from "@/hooks/useAllQuantityMinted";
import getMintValue from "@/utils/getMintValue";
import ShowPrice from "./showPrice";
import MintPrivate from "./mintPrivate";
import MintAllowlist from "./mintAllowlist";
import MintButtonPublic from "./mintButtonPublic";
import MintButtonWhitelist from "./mintButtonWhitelist";

const MintPart2 = ({ approveMint }) => {
  const { address } = useAccount();
  const [isUserWhitelist, setIsUserWhitelist] = useState(false);
  const [errorUserNotWhitelist, setErrorUserNotWhitelist] = useState("");
  const { status } = useCurrentStatus();
  const currentStatus = status;

  const [coverSelected, setCoverSelected] = useState(1);
  const [quantity, setQuantity] = useState(1);

  // const [allQuantityMinted, setAllQuantityMinted] = useState(false);
  const { allQuantityMinted } = useAllQuantityMinted();

  const [disableMint, setDisableMint] = useState(false);
  const isDisableMint = !approveMint || disableMint ? true : false;

  const quantityCover1 = () => {
    if (coverSelected === 1) return quantity;
    if (coverSelected === 2) return 0;
    if (coverSelected === 3) return 1;
  };

  const quantityCover2 = () => {
    if (coverSelected === 1) return 0;
    if (coverSelected === 2) return quantity;
    if (coverSelected === 3) return 1;
  };

  useEffect(() => {
    const res = isWhitelisted(address);
    if (res.isWhitelisted) {
      setIsUserWhitelist(true);
    } else {
      setIsUserWhitelist(false);
    }
  }, [address]);

  useEffect(() => {
    if (!isUserWhitelist) {
      if (currentStatus == 1) {
        setErrorUserNotWhitelist("SORRY, BUT YOU ARE NOT ALLOWLISTED");
      } else if (currentStatus == 2) {
        setErrorUserNotWhitelist("SORRY, BUT YOU ARE NOT WHITELISTED");
      } else {
        setErrorUserNotWhitelist("");
      }
    } else {
      setErrorUserNotWhitelist("");
    }
  }, [isUserWhitelist, currentStatus]);

  useEffect(() => {
    setDisableMint(false);
  }, [coverSelected]);

  return (
    <div className="bg-ob-blackborder">
      <div className={!approveMint ? "opacity-50" : ""}>
        <div className="px-4 py-5 text-base md:p-6">
          <div className="font-bold">
            <p>
              STEP 2: SELECT <span className="font-arial">&</span> MINT
            </p>
          </div>
          <MintPrivate />
          <MintAllowlist />
          <div className="pt-10">
            <Remaining />
          </div>
          <div className="flex flex-col w-full md:flex-row">
            <Cover1 />
            <div className="pt-2 sm:pt-0" />
            <Cover2 />
          </div>
          <SelectCover
            approveMint={approveMint}
            setCoverSelected={setCoverSelected}
          />
          {(coverSelected == 1 || coverSelected == 2) && (
            <SelectQuantity
              approveMint={approveMint}
              selectedCover={coverSelected}
              setQuantityCover={setQuantity}
              setDisableMint={setDisableMint}
            />
          )}
          <ShowPrice
            isUserWhitelist={isUserWhitelist}
            quantityBlack={quantityCover1()}
            quantityPurple={quantityCover2()}
          />
          {isUserWhitelist && (
            <MintButtonWhitelist
              approveMint={!isDisableMint}
              quantityCover1={quantityCover1()}
              quantityCover2={quantityCover2()}
              allQuantityMinted={allQuantityMinted}
            />
          )}
          {!isUserWhitelist && (
            <MintButtonPublic
              approveMint={!isDisableMint}
              quantityCover1={quantityCover1()}
              quantityCover2={quantityCover2()}
              allQuantityMinted={allQuantityMinted}
            />
          )}
          {errorUserNotWhitelist && (
            <ErrorNotification
              success={true}
              titleMessage={"Warning :"}
              message={errorUserNotWhitelist}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MintPart2;
