"use client";
import { useEffect, useState } from "react";
import { handler } from "@/app/api/storeShippingInfo";
import validateForm from "@/components/mint/validateForm";

const Form = ({ address, connected, shoppingInfo, setInfoSend }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postal: "",
    country: "",
    comments: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [submissionAttempted, setSubmissionAttempted] = useState(false);

  const [successSubmit, setSuccessSubmit] = useState(false);

  useEffect(() => {
    if (shoppingInfo) {
      setFormData({
        fullName: shoppingInfo.fullname || "",
        email: shoppingInfo.email || "",
        address: shoppingInfo.address || "",
        city: shoppingInfo.city || "",
        postal: shoppingInfo.postal || "",
        country: shoppingInfo.country || "",
        comments: shoppingInfo.comments || "",
      });
    }
  }, [shoppingInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const isValid = validateForm(formData);
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
          setInfoSend(true);
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
    <div className={`bg-ob-blackborder ${!connected ? "opacity-50" : ""}`}>
      <div className="px-4 py-5 text-base md:p-6">
        <div className="font-bold md:mx-6">
          <p>STEP 1: FILL SHIPPING INFO</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="px-4 py-5 text-base md:p-6">
          <div className="flex flex-wrap md:mx-2">
            <div className="flex flex-col flex-wrap w-full md:mx-2 md:flex-row">
              <div className="w-full px-2 mb-4 md:w-1/2 ">
                <input
                  type="text"
                  name="fullName"
                  id="full name"
                  placeholder="Last name + First name"
                  className="w-full px-4 py-2 text-white border border-white bg-ob-blackbg font-arial"
                  disabled={!connected}
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full px-2 md:w-1/2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 text-white border border-white bg-ob-blackbg font-arial"
                  disabled={!connected}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full px-2 my-4 md:w-1/2 md:mb-0">
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address"
                  className="w-full px-4 py-2 text-white border border-white bg-ob-blackbg font-arial"
                  disabled={!connected}
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full px-2 md:w-1/2 md:mt-4">
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                  className="w-full px-4 py-2 text-white border border-white bg-ob-blackbg font-arial"
                  disabled={!connected}
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full px-2 my-4 md:w-1/2 md:mb-0">
                <input
                  type="text"
                  name="postal"
                  id="postal"
                  placeholder="Postal code"
                  className="w-full px-4 py-2 text-white border border-white bg-ob-blackbg font-arial"
                  disabled={!connected}
                  value={formData.postal}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full px-2 md:w-1/2 md:mt-4">
                <input
                  type="text"
                  name="country"
                  id="country"
                  placeholder="Country"
                  className="w-full px-4 py-2 text-white border border-white bg-ob-blackbg font-arial"
                  disabled={!connected}
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full px-2 my-4 md:mb-0">
                <input
                  type="text"
                  name="comments"
                  id="comments"
                  placeholder="Additional comments"
                  className="w-full px-4 py-2 text-white border border-white bg-ob-blackbg font-arial"
                  disabled={!connected}
                  value={formData.comments}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col w-full px-2 pt-4 md:flex-row md:mt-4">
                <button
                  type="submit"
                  disabled={!connected}
                  className="w-1/2 px-4 py-2 text-white border border-white bg-ob-blackbg md:w-1/4 hover:bg-white hover:text-black"
                >
                  {shoppingInfo
                    ? "Update Shipping Info"
                    : successSubmit
                    ? "Thank you"
                    : "Submit to mint"}
                </button>
                {successSubmit && (
                  <div className="py-2 pt-2 md:px-4">
                    Your address has been submitted
                  </div>
                )}
                {!isFormValid && submissionAttempted && (
                  <div className="py-2 pt-2 text-red-500 md:px-4">
                    Please fill out all fields before submitting.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
