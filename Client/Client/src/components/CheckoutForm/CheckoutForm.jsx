import React from "react";
import PropTypes, { element } from "prop-types";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51PCLGsLpvJfnERw7u84pdbLZUuvS3uTSc8UV0FosVGpKDVTwWdbCtXiUr1dNftVCoz3lHE2epUtjVis1Z1ZC0CJF00N8PMHJ2F"
);
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const CheckoutForm = (props) => {
  console.log();
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("this is submit");

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
    } else {
      console.log(paymentMethod);
    }
  };
  return (
    <Elements stripe={stripePromise} className="h-screen w-[30vw] bg-pink-500">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center"
      >
        <CardElement
          options={{
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
          }}
        />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </Elements>
  );
};

CheckoutForm.propTypes = {};

export default CheckoutForm;
