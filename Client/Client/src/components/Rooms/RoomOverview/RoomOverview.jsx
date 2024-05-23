import { FaStar } from "react-icons/fa";
import demoImg from "../../../assets/hotel-image-demo.jpg";
import ContainerTwo from "../../Shared/ContainerTwo";
const RoomOverview = ({ room }) => {
  return (
    <ContainerTwo>
      <div id="Overview" className="space-y-2 mt-10">
        {/* todo: make it dynamic */}
        <h1 className="text-2xl font-medium">{room?.title}</h1>

        <div className="flex gap-4 mb-2">
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <div
          className="
              text-xl 
              font-semibold 
              flex 
              flex-row 
              items-center
              gap-2
            "
        >
          <div>
            Hosted by <span>{room?.host?.name}</span>
          </div>

          <img
            className="rounded-full"
            height="30"
            width="30"
            alt="Avatar"
            src={demoImg}
          />
        </div>
        <div className="flex items-center gap-5 font-light text-neutral-500">
          <div>{room?.guest} guests</div>
          <div>{room?.bedrooms} rooms</div>
          <div>{room?.bathrooms} bathrooms</div>
        </div>
        {/* special amenity */}
        <p>{room?.feature}</p>
        {/* room description */}
        <p className="text-lg font-light text-neutral-500">
          {room?.description}
        </p>
        {/* todo: dynamically generate rating */}
        <div className="flex items-center gap-4">
          <div className="text-white h-10 w-10 font-bold flex items-center justify-center bg-green-500">
            8.8
          </div>
          <p className=" font-bold text-center text-sky-600 border-b border-sky-600 hover:cursor-pointer">
            {"See all 1,006 reviews >"}
          </p>
        </div>
      </div>
    </ContainerTwo>
  );
};

export default RoomOverview;
