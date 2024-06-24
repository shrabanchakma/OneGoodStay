import PropTypes from "prop-types";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import useUserData from "../../Hooks/useUserData";
import { bookARoom } from "../../Api/rooms";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useHostedRooms } from "../../Hooks/useHostedRooms";
const CheckoutForm = ({ roomID, roomData }) => {
  const { userData } = useUserData();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          // return_url: `${window.location.origin}/room-details/${roomID}`,
        },
      });

      // console.log("error-->", error);
      if (error) {
        console.log("error->", error);
      } else if (paymentIntent.status === "succeeded") {
        // set room details in database
        const bookedRoom = {
          guest: {
            name: userData?.name,
            email: userData?.email,
          },
          roomID: roomID,
          price: roomData?.price,
        };

        const { insertedId } = await toast.promise(
          bookARoom(roomID, bookedRoom),
          {
            loading: "Please Wait...",
            success: <p className="text-green-500">Room booking successful</p>,
            error: <p className="text-red-500">An error occurred</p>,
          }
        );
        if (insertedId) {
          navigate(`/room-details/${roomID}`);
        }
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center checkoutForm   p-10  bg-slate-100 z-50"
    >
      <label className="text-3xl text-center font-semibold my-10">
        Almost Done!
      </label>
      <fieldset className="w-full">
        <legend className="font-semibold text-xl my-2">Guest Details:</legend>
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
        <div className="w-full mb-2">
          <label htmlFor="email" className="text-base">
            Phone number
          </label>
          <input
            id="email"
            type="text"
            value={userData?.contactInfo?.number || "Not provided"}
            className="block w-full px-4 py-2 border border-gray-400 rounded-md text-gray-400"
            disabled
          />
        </div>
      </fieldset>
      <fieldset className="mt-5">
        <legend className="font-semibold text-xl my-2">Payment Details:</legend>
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
