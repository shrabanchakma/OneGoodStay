import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axiosSecure from "../../Api";
import { useLoaderData, useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutFrom";
import useUserData from "../../Hooks/useUserData";
import { useMemo } from "react";

const Checkout = () => {
  const roomData = useLoaderData();
  const { userData } = useUserData();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const roomInfo = useMemo(() => {
    return {
      guestName: userData?.name,
      guestEmail: userData?.email,
      roomID: roomData?._id,
      price: roomData?.price,
    };
  }, [userData, roomData]);
  console.log(roomInfo);
  useEffect(() => {
    axiosSecure
      .get("/stripe-publishable-key")
      .then(({ data: { publishableKey } }) =>
        setStripePromise(loadStripe(publishableKey))
      );
  }, []);

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", roomInfo)
      .then(({ data: { clientSecret } }) => setClientSecret(clientSecret));
  }, [roomInfo]);
  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#e41b43",
    },
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      {stripePromise && clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance }}
          className=" h-full"
        >
          <CheckoutForm roomID={roomData?._id} />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
