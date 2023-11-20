import { useState, useEffect, useContext } from "react";

import { getShippingInfo } from "@/app/api/getShippingInfo";
import { CheckoutWithCard } from "@paperxyz/react-client-sdk";

import checkUserWhitelisted from "./checkUserWhitelisted";
import Divider from "../separator";
import Form from "./form";
import Remaining from "./remaining";
import FiatPayment from "./fiatPayment";
import ABI from "@/app/contract/abi/UNDOXXED.json";
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

const MintPart2 = ({ address, approveMint }) => {
  const [isUserWhitelist, setIsUserWhitelist] = useState(false);
  const [errorUserNotWhitelist, setErrorUserNotWhitelist] = useState("");
  const { status } = useCurrentStatus();
  const currentStatus = status;

  const [coverSelected, setCoverSelected] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const [allQuantityMinted, setAllQuantityMinted] = useState(false);

  const quantityCover1 = coverSelected === 1 ? quantity : 0;
  const quantityCover2 = coverSelected === 2 ? quantity : 0;

  const getMintInfos = () => {
    const res = checkUserWhitelisted(address, currentStatus);

    const value = getMintValue(currentStatus, quantityCover1, quantityCover2);

    return {
      address: address,
      quantityCover1: quantityCover1,
      quantityCover2: quantityCover2,
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
        setErrorUserNotWhitelist("You are not Allowlisted");
      } else if (currentStatus == 2) {
        setErrorUserNotWhitelist("You are not Whitelisted");
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
        <div className="px-4 py-5 text-base sm:p-6 font-proxima_reg">
          <div className="font-proxima_reg">
            <p>Step 2: Mint your NFT</p>
            <p className="pt-4">
              We are thrilled to announce an exciting opportunity to showcase
              your artistic skills and make a lasting impact on the upcoming
              book “UNDOXXED” – a captivating exploration of “The Finest in
              Digital Lifestyle Culture”. We are seeking a captivating and
              visually striking design that encapsulates the essence of
              “UNDOXXED” and its exploration of digital culture for the cover,
              spine, and back of the book. This is an exceptional opportunity to
              leave your artistic imprint on a significant publication that will
              resonate with enthusiasts worldwide.
            </p>
          </div>
          <div className="pt-6">
            <Remaining setAllQuantityMinted={setAllQuantityMinted} />
          </div>
          <div className="flex flex-col w-full pt-6 sm:flex-row">
            <Cover1 />
            <div className="pt-4 sm:pt-0" />
            <Cover2 />
          </div>
          <SelectCover
            approveMint={approveMint}
            setCoverSelected={setCoverSelected}
          />
          <SelectQuantity
            approveMint={approveMint}
            selectedCover={coverSelected}
            setQuantityCover={setQuantity}
          />
          <MintButtonETH
            approveMint={approveMint}
            quantityCover1={quantityCover1}
            quantityCover2={quantityCover2}
            allQuantityMinted={allQuantityMinted}
          />
          {(currentStatus == 2 || currentStatus == 3) && (
            <FiatPayment
              approveMint={approveMint}
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
