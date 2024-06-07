import PropTypes from "prop-types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
const CheckoutForm = ({ roomID }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("this is submit");

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

    setIsProcessing(false);
  };
  const cardElementStyles = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center checkoutForm w-full z-50"
    >
      <PaymentElement />
      <button
        className={
          " w-40 p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-sky-700"
        }
        disabled={!stripe || isProcessing}
      >
        <span className={`${isProcessing ? "animate-pulse" : ""}`}>
          {isProcessing ? "Processing" : "Pay"}
        </span>
      </button>
    </form>
  );
};

CheckoutForm.propTypes = {};

export default CheckoutForm;
