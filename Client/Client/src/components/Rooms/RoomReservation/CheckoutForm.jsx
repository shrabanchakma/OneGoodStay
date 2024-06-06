import PropTypes from "prop-types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
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
      console.log("error->", error);
    } else {
      console.log("payment method->", paymentMethod);
    }
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
      className="flex items-center justify-center checkoutForm w-full"
    >
      <CardElement className="bg-green-500" options={cardElementStyles} />
      <button className="checkoutButton" type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

CheckoutForm.propTypes = {};

export default CheckoutForm;
