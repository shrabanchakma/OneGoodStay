import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./checkoutFormStyle.css";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const CheckoutModal = ({ isOpen, setIsOpen }) => {
  return (
    <Transition appear show={isOpen}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative w-full z-50"
      >
        <div className="fixed inset-0 flex w-full items-center justify-center ">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="h-[20vw] w-[25vw] bg-green-500 rounded-xl flex items-center justify-center">
              <div>review</div>
              {/* check out  */}
              <Elements stripe={stripePromise} className="w-full">
                <CheckoutForm />
              </Elements>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

CheckoutModal.propTypes = {};

export default CheckoutModal;
