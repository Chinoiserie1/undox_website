"use client";
import { useState } from "react";
import { useAccount } from "wagmi";
import ConnectWallet from "./connectWallet";
import DisplayWallet from "./displayWallet";
import { handler } from "@/app/api/storeShippingInfo";

const Mint = () => {
  const currentStatus = 0;
  const status = ["Allowlist", "Whitelist", "Public"];
  const { address } = useAccount();
  const connected = address ? true : false;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postal: "",
    country: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [submissionAttempted, setSubmissionAttempted] = useState(false);

  const [successSubmit, setSuccessSubmit] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const isValid = Object.values(formData).every(
      (field) => field.trim() !== ""
    );
    setIsFormValid(isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request = { ...formData, ETHAddress: address };

    setSubmissionAttempted(true);

    try {
      if (isFormValid) {
        const response = await handler(request);

        if (response.ok) {
          console.log("Data stored successfully!");
          setSuccessSubmit(true);
        } else {
          console.error("Failed to store data");
        }
      } else {
        console.log("Please fill out all fields before submitting.");
      }
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  return (
    <div className="pt-10">
      <h1 className="pb-10 font-bold">Mint</h1>
      {/* Connect Wallet and Sale Status */}
      <div className="w-full overflow-hidden border border-white shadow">
        <div className="flex w-full">
          {connected ? <DisplayWallet address={address} /> : <ConnectWallet />}
          <div className="flex items-center w-1/2 font-bold sm:text-xl lg:text-2xl">
            <div className="px-4 py-5 sm:p-6">
              <p>{status[currentStatus]}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`w-full overflow-hidden border border-t-0 border-white shadow ${
          !connected ? "opacity-50" : ""
        }`}
      >
        <div className="px-4 py-5 text-base sm:p-6">
          <p>Step 1: Your Shipping Info</p>
          <p className="pt-4">
            We are thrilled to announce an exciting opportunity to showcase your
            artistic skills and make a lasting impact on the upcoming book
            “UNDOXXED” – a captivating exploration of “The Finest in Digital
            Lifestyle Culture”. We are seeking a captivating and visually
            striking design that encapsulates the essence of “UNDOXXED” and its
            exploration of digital culture for the cover, spine, and back of the
            book. This is an exceptional opportunity to leave your artistic
            imprint on a significant publication that will resonate with
            enthusiasts worldwide.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-4 py-5 text-base sm:p-6">
            <div className="flex flex-wrap -mx-2">
              <div className="flex flex-col flex-wrap w-full -mx-2 sm:flex-row">
                <div className="w-full px-2 mb-4 sm:w-1/2 sm:mb-0">
                  <input
                    type="text"
                    name="fullName"
                    id="full name"
                    placeholder="Full name"
                    className="w-full px-4 py-2 text-white bg-black border border-white"
                    disabled={!connected}
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full px-2 sm:w-1/2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 text-white bg-black border border-white"
                    disabled={!connected}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full px-2 my-4 sm:w-1/2 sm:mb-0">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Address"
                    className="w-full px-4 py-2 text-white bg-black border border-white"
                    disabled={!connected}
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full px-2 sm:w-1/2 sm:mt-4">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="City"
                    className="w-full px-4 py-2 text-white bg-black border border-white"
                    disabled={!connected}
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full px-2 my-4 sm:w-1/2 sm:mb-0">
                  <input
                    type="text"
                    name="postal"
                    id="postal"
                    placeholder="Postal"
                    className="w-full px-4 py-2 text-white bg-black border border-white"
                    disabled={!connected}
                    value={formData.postal}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full px-2 sm:w-1/2 sm:mt-4">
                  <input
                    type="text"
                    name="country"
                    id="country"
                    placeholder="Country"
                    className="w-full px-4 py-2 text-white bg-black border border-white"
                    disabled={!connected}
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col w-full px-2 pt-4 sm:flex-row sm:mt-4">
                  <button
                    type="submit"
                    disabled={!connected}
                    className="w-1/2 px-4 py-2 text-white bg-black border border-white sm:w-1/4 hover:bg-white hover:text-black"
                  >
                    {successSubmit ? "Thank you" : "Submit"}
                  </button>
                  {successSubmit && (
                    <div className="py-2 pt-2 sm:px-4">
                      Your address has been submitted
                    </div>
                  )}
                  {!isFormValid && submissionAttempted && (
                    <div className="py-2 pt-2 text-red-500 sm:px-4">
                      Please fill out all fields before submitting.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Mint;
