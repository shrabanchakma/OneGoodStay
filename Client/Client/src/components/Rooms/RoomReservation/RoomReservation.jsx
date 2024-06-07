import Heading from "../../Shared/Heading";
import ReservationCalender from "./ReservationCalender";
import ContainerTwo from "../../Shared/ContainerTwo";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";
const RoomReservation = ({ room }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleModalOpen = () => {
    setIsOpen(true);
  };
  return (
    <ContainerTwo>
      <div id="Reservation" className="my-5 md:my-10 lg:my-20 ">
        <Heading label="Room Reservation" />
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4  p-5  border-[#e41b43] rounded-xl">
          <ReservationCalender room={room} />
          <div className="">
            <img
              src={room?.image}
              alt=""
              className="w-full h-4/5 mb-4 rounded-t-xl"
            />
            <div className="flex items-center justify-between mb-1">
              <h1 className="font-medium">
                Price:{" "}
                <span className="font-normal text-sm">${room?.price}</span>
              </h1>
              <button
                onClick={handleModalOpen}
                className="bg-sky-600 text-white  font-bold w-40 h-[40px] rounded-3xl hover:bg-sky-700"
              >
                Reserve
              </button>
            </div>
            <hr />
          </div>
        </div>
      </div>
      <CheckoutModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </ContainerTwo>
  );
};

export default RoomReservation;
