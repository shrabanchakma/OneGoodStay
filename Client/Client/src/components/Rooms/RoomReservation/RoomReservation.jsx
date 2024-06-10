import Heading from "../../Shared/Heading";
import ReservationCalender from "./ReservationCalender";
import ContainerTwo from "../../Shared/ContainerTwo";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useUserData from "../../../Hooks/useUserData";
const RoomReservation = ({ room }) => {
  const { userData } = useUserData();
  return (
    <ContainerTwo>
      <div id="Reservation" className="my-5 md:my-10 lg:my-20 -z-10">
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
              <Link to={`/checkout/room/${room?._id}`}>
                <button
                  disabled={room?.isBooked || userData?.role === "admin"}
                  data-tooltip-id="tooltip"
                  data-tooltip-delay-show={300}
                  className="bg-sky-600 text-white  font-bold w-40 h-[40px] rounded-3xl hover:bg-sky-700 disabled:cursor-not-allowed"
                >
                  Reserve
                </button>
                <Tooltip
                  id="tooltip"
                  place="right"
                  content={
                    (userData?.role === "admin" && "You cannot book") ||
                    (room?.isBooked ? "Already booked" : "Reserve room")
                  }
                  variant="light"
                  style={{
                    backgroundColor: "rgb(229 229 229)",
                  }}
                />
              </Link>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </ContainerTwo>
  );
};

export default RoomReservation;
