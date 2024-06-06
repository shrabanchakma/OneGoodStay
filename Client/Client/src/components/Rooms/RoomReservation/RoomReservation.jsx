import Heading from "../../Shared/Heading";
import ReservationCalender from "./ReservationCalender";
import demoRoomImg from "../../../assets/hotel-image-demo.jpg";
import ContainerTwo from "../../Shared/ContainerTwo";
import { Link } from "react-router-dom";
const RoomReservation = ({ room }) => {
  return (
    <ContainerTwo>
      <div id="Reservation" className="my-20">
        <Heading label="Room Reservation" />
        <div className="flex items-center  gap-4  h-[40vh]  p-5  border-[#e41b43] rounded-xl">
          <ReservationCalender room={room} />
          <div className="w-full h-full">
            <img
              src={demoRoomImg}
              alt=""
              className="w-full h-4/5 mb-4 rounded-t-xl"
            />
            <div className="flex items-center justify-between mb-1">
              <h1 className="font-medium">
                Price:{" "}
                <span className="font-normal text-sm">${room?.price}</span>
              </h1>

              <Link to={"/checkout"}>
                <button className="bg-sky-600 text-white  font-bold w-40 h-[40px] rounded-3xl hover:bg-sky-700">
                  Reserve
                </button>
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
