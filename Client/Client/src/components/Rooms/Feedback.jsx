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
import useUserData from "../../Hooks/useUserData";
import { Tooltip } from "react-tooltip";
import { saveRatingData } from "../../Api/rooms";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Feedback = ({ room }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [ratings, setRatings] = useState({});
  const [comment, setComment] = useState("");
  const [nextStep, setNextStep] = useState(false);
  const totalRating = Array.from({ length: 5 }, (_, i) => i + 1);
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
  const isUserSame = user?.email === room?.host?.email;
  const isBtnDisabled =
    !ratings?.["overall satisfaction"] || comment.length === 0;
  const handleSubmit = async () => {
    setNextStep(false);
    try {
      const ratingData = {
        guest: {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        },
        roomId: room?._id,
        date: new Date(new Date().setHours(0, 0, 0, 0)),
        comment,
        ratings: {
          ...ratings,
        },
      };
      console.table(ratingData);
      setIsOpen(false);
      await toast.promise(saveRatingData(ratingData), {
        loading: "Saving changes...",
        success: <p>Thank you for your feedback</p>,
        error: <p className="text-pink-700">Ops! Something went wrong</p>,
      });
      setRatings({});
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleNext = () => {
    setNextStep((prev) => !prev);
  };
  const handleComment = (e) => {
    setComment(e.target.value);
  };
  return (
    <div className="w-full flex flex-col items-center justify-center gap-1">
      <span className="text-sm">Tell us how was the room</span>
      <button
        onClick={handleModal}
        data-tooltip-id="feedback"
        data-tooltip-delay-show={300}
        data-tooltip-content={isUserSame ? "Cannot rate hosted rooms" : ""}
        data-tooltip-place="right"
        data-tooltip-variant="light"
        data-tooltip-float="true"
        disabled={isUserSame}
        className="text-sky-500 font-bold border border-black bg-white  hover:bg-sky-100 active:bg-sky-200 px-4 py-2 rounded-3xl disabled:cursor-not-allowed"
      >
        Share feedback
      </button>
      <Tooltip id="feedback" />
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
                className={`w-[27rem] p-8 flex flex-col items-center justify-center space-y-4 border   rounded-xl bg-white border-sky-600 `}
              >
                <Logo />
                <div className="w-[100%] overflow-hidden ">
                  <h1 className="w-full pb-4 border-b border-gray-200 text-sm">
                    Thank you in advance for you feedback
                  </h1>
                  <div
                    className={`w-[200%] flex items-center justify-start  mb-5    relative`}
                  >
                    <div
                      className={`w-[50%] h-auto  gap-1 flex flex-col justify-center items-center  ${
                        nextStep ? "ml-[-50%]" : ""
                      } transform-margin ease-in-out duration-150 `}
                    >
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
                    <form
                      className={`w-[50%] h-auto  gap-1 flex flex-col justify-center items-start`}
                    >
                      <h1 className="font-medium w-full text-start">
                        {"Overall satisfaction?"} <br />
                        <span>{"(1 = lowest and 5 = highest)"}</span>
                      </h1>
                      <div className=" flex items-center justify-center  gap-2  mb-5 ">
                        {totalRating.map((rating) => (
                          <div
                            key={rating}
                            onClick={() =>
                              handleRatings("overall satisfaction", rating)
                            }
                            className={`w-12 h-12 flex items-center justify-center  rounded-[50%] border bg-neutral-100  hover:bg-sky-600 active:bg-sky-700 cursor-pointer relative ${
                              rating <= ratings?.["overall satisfaction"]
                                ? " bg-sky-600 text-white  hover:text-white"
                                : "text-sky-600 hover:text-white "
                            }transition-colors ease-in-out duration-100 `}
                          >
                            <span>{rating}</span>
                          </div>
                        ))}
                      </div>

                      <h1 className="mt-2 font-medium">
                        {
                          "Please include anything else you'd like us to improve *"
                        }
                      </h1>
                      <textarea
                        onChange={handleComment}
                        placeholder="Please comment here ..."
                        className="focus:outline-none px-4 pt-2 rounded-xl text-[17px]  border w-full min-h-[180px]"
                      />
                    </form>
                  </div>
                  <div className="flex items-center justify-center my-3 gap-2 relative">
                    <div
                      className={`${
                        nextStep ? "bg-gray-500" : " bg-sky-600"
                      } w-[40px] h-[3px] `}
                    ></div>
                    <div
                      className={`${
                        nextStep ? "bg-sky-600" : "bg-gray-500"
                      } w-[40px] h-[3px]`}
                    ></div>
                  </div>
                  <div className="w-full flex justify-center ">
                    {nextStep ? (
                      <div className="flex items-center justify-center gap-2 w-full">
                        <button
                          onClick={handleNext}
                          className="w-full h-10 text-white rounded-3xl bg-sky-600 hover:bg-sky-700 active:bg-sky-800 outline-none"
                        >
                          Previous
                        </button>
                        <button
                          disabled={isBtnDisabled}
                          onClick={handleSubmit}
                          className="w-full h-10 text-white rounded-3xl bg-sky-600 hover:bg-sky-700 active:bg-sky-800 outline-none disabled:bg-sky-200"
                        >
                          Submit
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="w-full h-10 text-white rounded-3xl bg-sky-600 hover:bg-sky-700 active:bg-sky-800 outline-none"
                      >
                        Next
                      </button>
                    )}
                  </div>
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
