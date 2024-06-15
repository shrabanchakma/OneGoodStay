import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Rating from "./Rating";
import Logo from "../Shared/Logo";

const Feedback = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ratings, setRatings] = useState({});
  console.log(ratings);
  const handleRatings = (label, rating) => {
    let name = label.toLowerCase();
    let value = 0;
    if (ratings[name] !== rating) {
      value = rating;
    }
    setRatings((prev) => ({ ...prev, [name]: value }));
  };
  const handleModal = () => {
    setIsOpen(true);
  };
  return (
    <div className="w-full flex flex-col items-center justify-center gap-1">
      <span className="font-medium">Tell us how was the room</span>
      <button
        onClick={handleModal}
        className="text-sky-700 font-bold border border-black bg-white  hover:bg-sky-100 active:bg-sky-200 px-4 py-2 rounded-3xl"
      >
        Share feedback
      </button>
      <Transition show={+isOpen}>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50 w-full"
        >
          <TransitionChild
            show={+isOpen}
            enter="transition-all transform duration-200"
            enterFrom="scale-0 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="transition-all transform duration-200"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-50 opacity-0"
          >
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <DialogPanel
                className={`w-3/12 p-8 flex flex-col items-center justify-center space-y-4 border   rounded-xl bg-white border-sky-600 `}
              >
                <Logo />
                <h1 className="w-full pb-4 border-b border-gray-200 text-sm">
                  Thank you in advance for you feedback
                </h1>
                <div className="h-auto w-full  gap-1 flex flex-col justify-center items-center">
                  <Rating
                    label={"Cleanliness"}
                    handleRatings={handleRatings}
                    currentRating={ratings?.cleanliness}
                  />
                  <Rating
                    label={"Staff & Service"}
                    handleRatings={handleRatings}
                    currentRating={ratings?.["staff & service"]}
                  />
                  <Rating
                    label={"Amenities"}
                    handleRatings={handleRatings}
                    currentRating={ratings?.["amenities"]}
                  />
                  <Rating
                    label={"Property conditions & facilities"}
                    handleRatings={handleRatings}
                    currentRating={
                      ratings?.["property conditions & facilities"]
                    }
                  />
                  <Rating
                    label={"Eco-friendliness"}
                    handleRatings={handleRatings}
                    currentRating={ratings?.["eco-friendliness"]}
                  />
                </div>
                <div className="w-full flex justify-center">
                  <button className="px-4 py-2 text-white rounded-3xl bg-sky-600 hover:bg-sky-700 active:bg-sky-800 outline-none">
                    Submit
                  </button>
                </div>
              </DialogPanel>
            </div>
          </TransitionChild>
        </Dialog>
      </Transition>
    </div>
  );
};

Feedback.propTypes = {};

export default Feedback;
