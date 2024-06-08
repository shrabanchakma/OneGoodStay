import PropTypes from "prop-types";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import useUserData from "../../Hooks/useUserData";
const CheckoutForm = ({ roomID }) => {
  const { userData } = useUserData();
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/room-details/${roomID}`,
      },
    });

    if (error) {
      console.log("error->", error);
    }
    // todo:send booked-room details in database
    setIsProcessing(false);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center checkoutForm min-h-screen  p-10  bg-slate-50 z-50"
    >
      <fieldset className="w-full">
        {/* user info */}
        <div className="w-full mb-2">
          <label htmlFor="name" className="text-base">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={userData?.name || " "}
            className="block w-full px-4 py-2 border border-gray-400 rounded-md text-gray-400"
            disabled
          />
        </div>
        <div className="w-full mb-2">
          <label htmlFor="email" className="text-base">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={userData?.email || " "}
            className="block w-full px-4 py-2 border border-gray-400 rounded-md text-gray-400"
            disabled
          />
        </div>
      </fieldset>
      <fieldset className="mt-5">
        <PaymentElement />
      </fieldset>
      <button
        className={
          " w-40 p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md    bg-[#e41b43] hover:bg-[#f05d68] active:bg-[#e41b43]"
        }
        disabled={!stripe || isProcessing}
      >
        <span className={`${isProcessing ? "animate-pulse" : ""}`}>
          {isProcessing ? "Processing..." : "Pay"}
        </span>
      </button>
    </form>
  );
};

CheckoutForm.propTypes = {};

export default CheckoutForm;
