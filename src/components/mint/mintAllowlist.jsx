import { useAccount } from "wagmi";
import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState, Fragment, useRef, useEffect } from "react";
import useBalanceMintBySign from "@/hooks/useBalanceMintBySign";
import { isAllowlisted } from "./checkUserWhitelisted";
import MintButtonAllowlist from "./mintButtonAllowlist";
import getMintValue from "@/utils/getMintValue";

const MintAllowlist = () => {
  const { address } = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const [isUserAllowlisted, setIsUserAllowlisted] = useState(
    isAllowlisted(address)
  );

  const { dataCover1, dataCover2 } = useBalanceMintBySign(
    isUserAllowlisted.signature
  );

  // useEffect(() => {
  if (isUserAllowlisted.isAllowlisted != isAllowlisted(address).isAllowlisted) {
    setIsUserAllowlisted(isAllowlisted(address));
  }
  // }, [address, isUserAllowlisted]);

  useEffect(() => {
    if (isUserAllowlisted.isAllowlisted) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isUserAllowlisted]);

  useEffect(() => {
    if (dataCover1 == 0 && dataCover2 == 0) {
      const res = isAllowlisted(address);
      if (res?.isAllowlisted == true) {
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
    if (dataCover1 > 0 || dataCover2 > 0) {
      setIsOpen(false);
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => handleCloseDialog()}
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
                    Congratulation, You have been ALLOWLISTED
                    <span className="font-arial">!</span>
                  </h1>
                  <p className="pt-2">
                    You have an allocation of{" "}
                    <span className="font-arial">
                      {isUserAllowlisted?.cover1}
                    </span>{" "}
                    Black cover<span className="font-arial">(</span>s
                    <span className="font-arial">)</span>{" "}
                    <span className="font-arial">&</span>{" "}
                    <span className="font-arial">
                      {isUserAllowlisted?.cover2}
                    </span>{" "}
                    Purple cover<span className="font-arial">(</span>s
                    <span className="font-arial">)</span>{" "}
                  </p>
                </div>
                {/* </div> */}
                <MintButtonAllowlist userInfos={isUserAllowlisted} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MintAllowlist;
