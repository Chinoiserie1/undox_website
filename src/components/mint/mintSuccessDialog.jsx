import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState, Fragment, useRef } from "react";

const etherscanPath = "https://etherscan.io/tx/";
const goerliscanPath = "https://goerli.etherscan.io/tx/";

const openseaPath = "https://etherscan.io/tx/";

const MintSuccessDialog = ({ hash }) => {
  const [isOpen, setIsOpen] = useState(true);

  const scanPath = openseaPath;

  const cancelButtonRef = useRef(null);

  const handleCloseDialog = () => {
    setIsOpen(false);
    window.location.reload(true);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handleCloseDialog}
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
                <div className="md:flex md:items-start">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full md:mx-0 md:h-10 md:w-10">
                    <CheckCircleIcon
                      className="w-6 h-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center md:ml-4 md:mt-0 md:text-left">
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        SUCCESSFULLY MINTED{" "}
                        <span className="font-arial">!</span>
                      </p>
                      <a
                        className="mt-1 text-sm text-gray-500 hover:underline"
                        href={`${scanPath}${hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        click to see more
                      </a>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MintSuccessDialog;
