"use client";
import { Dialog, Transition } from "@headlessui/react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Fragment } from "react";
import { useAccount } from "wagmi";

const WalletConnectDialog = () => {
  const { open, networks } = useWeb3Modal();
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();

  const handleOpenDialog = () => {
    if (isDisconnected || isConnecting) {
      return true;
    }
    return false;
  };

  const handleClose = () => {
    if (isDisconnected) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <Transition.Root show={handleOpenDialog()} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={handleClose}>
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

          <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
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
                <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform rounded-lg shadow-xl bg-ob-blackborder md:my-8 md:w-full md:max-w-sm md:p-6">
                  <div>
                    <div className="mt-3 text-center md:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-white"
                      >
                        Connect Wallet to access website
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="mt-5 md:mt-6">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-black bg-white rounded-md shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      onClick={() => open()}
                    >
                      Connect Wallet
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default WalletConnectDialog;
