import { useState, useEffect, useContext } from "react";

import { getShippingInfo } from "@/app/api/getShippingInfo";
import { CheckoutWithCard } from "@paperxyz/react-client-sdk";

import checkUserWhitelisted, { isWhitelisted } from "./checkUserWhitelisted";
import Divider from "../separator";
import Form from "./form";
import Remaining from "./remaining";
import FiatPayment from "./fiatPayment";
import MintSuccess from "./mintSuccess";
import TransactionSubmited from "./transactionSubmit";
import Cover1 from "./cover1";
import Cover2 from "./cover2";
import ErrorDialog from "./errorDialog";
import ErrorNotification from "./errorNotification";
import SelectQuantity from "./selectQuantity";
import SelectCover from "./selectCover";
import useCurrentStatus from "@/hooks/useCurrentStatus";
import MintButtonETH from "./mintButtonETH";
import getMintValue from "@/utils/getMintValue";
import ShowPrice from "./showPrice";

const MintPart2 = ({ address, approveMint }) => {
  const [isUserWhitelist, setIsUserWhitelist] = useState(false);
  const [errorUserNotWhitelist, setErrorUserNotWhitelist] = useState("");
  const { status } = useCurrentStatus();
  const currentStatus = status;

  const [coverSelected, setCoverSelected] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const [allQuantityMinted, setAllQuantityMinted] = useState(false);

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

  const getMintInfos = () => {
    const res = checkUserWhitelisted(address, currentStatus);

    const value = getMintValue(
      currentStatus,
      quantityCover1(),
      quantityCover2(),
      isWhitelisted(address).isWhitelisted
    );

    return {
      address: address,
      quantityCover1: quantityCover1(),
      quantityCover2: quantityCover2(),
      value: value,
      ...res,
    };
  };

  useEffect(() => {
    const res = checkUserWhitelisted(address, currentStatus);
    if (res.success) {
      setIsUserWhitelist(true);
    } else {
      setIsUserWhitelist(false);
    }
  }, [address, currentStatus]);

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

  return (
    <div>
      <div className={!approveMint ? "opacity-50" : ""}>
        <div className="px-4 py-5 text-base sm:p-6 font-[ProximaRegular]">
          <div className="font-[TTMoons] font-bold">
            <p>STEP 2: SELECT & MINT</p>
          </div>
          <div className="pt-10">
            <Remaining setAllQuantityMinted={setAllQuantityMinted} />
          </div>
          <div className="flex flex-col w-full sm:flex-row">
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
          <MintButtonETH
            approveMint={!isDisableMint}
            quantityCover1={quantityCover1()}
            quantityCover2={quantityCover2()}
            allQuantityMinted={allQuantityMinted}
            errorUserNotWhitelisted={errorUserNotWhitelist}
          />
          {(currentStatus == 2 || currentStatus == 3) &&
            errorUserNotWhitelist == "" && (
              <FiatPayment
                approveMint={!isDisableMint}
                allQuantityMinted={allQuantityMinted}
                mintInfos={getMintInfos()}
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
