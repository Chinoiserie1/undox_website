import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState, Fragment, useRef, useEffect } from "react";
import useGetBalanceCover1 from "@/hooks/getBalanceOfCover1";
import useGetBalanceCover2 from "@/hooks/getBalanceOfCover2";
import { isPrivateWhitelisted } from "./checkUserWhitelisted";
import MintButtonPrivate from "./mintButtonPrivate";
import getMintValue from "@/utils/getMintValue";

const MintPrivate = ({ address }) => {
  const [isOpen, setIsOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const [isUserPrivateWhitelist, setIsUserPrivateWhitelist] = useState(
    isPrivateWhitelisted(address)
  );

  const { dataCover1 } = useGetBalanceCover1(address);
  const { dataCover2 } = useGetBalanceCover2(address);

  const value = getMintValue(
    2,
    isUserPrivateWhitelist?.cover1,
    isUserPrivateWhitelist?.cover2,
    true
  );

  useEffect(() => {
    if (isUserPrivateWhitelist.isPrivateWhitelisted) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isUserPrivateWhitelist]);

  useEffect(() => {
    if (dataCover1 == 0 && dataCover2 == 0) {
      const res = isPrivateWhitelisted(address);
      if (res?.isPrivateWhitelisted == true) {
        setIsOpen(true);
      }
    }
  }, [dataCover1, dataCover2, address]);

  useEffect(() => {
    if (dataCover1 > 0 || dataCover2 > 0) {
      setIsOpen(false);
    }
  }, [dataCover1, dataCover2]);

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => {}}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center md:items-center md:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl md:my-8 md:w-full md:max-w-lg md:p-6">
                {/* <div className="md:flex md:items-start"> */}
                <div className="mt-3 text-center md:ml-4 md:mt-0 md:text-left">
                  <h1 className="font-bold">
                    Congrats you are a VIP <span className="font-arial">!</span>
                  </h1>
                  <p className="pt-2">
                    U have a allocation of {isUserPrivateWhitelist?.cover1}{" "}
                    cover black <span className="font-arial">&</span>{" "}
                    {isUserPrivateWhitelist?.cover2} cover purple{" "}
                  </p>
                  <p className="pt-1">total payout : {value} ETH</p>
                </div>
                {/* </div> */}
                <MintButtonPrivate userInfos={isUserPrivateWhitelist} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MintPrivate;