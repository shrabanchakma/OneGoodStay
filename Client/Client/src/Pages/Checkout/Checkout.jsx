import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axiosSecure from "../../Api";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutFrom";

const Checkout = () => {
  const { id:roomID } = useParams();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  useEffect(() => {
    axiosSecure
      .get("/stripe-publishable-key")
      .then(({ data: { publishableKey } }) =>
        setStripePromise(loadStripe(publishableKey))
      );
  }, []);

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent")
      .then(({ data: { clientSecret } }) => setClientSecret(clientSecret));
  }, []);
  return (
    <div className="flex items-center justify-center h-screen">
      {stripePromise && clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret }}
          className="w-full"
        >
          <CheckoutForm roomID={roomID}/>
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
