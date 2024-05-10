import { FaStar } from "react-icons/fa";
import demoImg from "../../../assets/hotel-image-demo.jpg";
import ContainerTwo from "../../Shared/ContainerTwo";
const RoomOverview = () => {
  return (
    <ContainerTwo>
      <div id="Overview" className="space-y-2 mt-10">
        {/* todo: make it dynamic */}
        <h1 className="text-2xl font-medium">Wingate by Wyndham Kamloops</h1>

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
          <div>Hosted by ShrabanChakma</div>

          <img
            className="rounded-full"
            height="30"
            width="30"
            alt="Avatar"
            src={demoImg}
          />
        </div>
        <div className="flex items-center gap-5 font-light text-neutral-500">
          <div>5 guests</div>
          <div>5 rooms</div>
          <div>2 bathrooms</div>
        </div>
        {/* special amenity */}
        <p>Aberdeen hotel with indoor pool and 24-hour fitness</p>
        {/* room description */}
        <p className="text-lg font-light text-neutral-500">
          Indulge in luxurious comfort with our hotel rooms, boasting elegant
          decor and modern amenities. Relax in plush beds, rejuvenate in
          spacious bathrooms, and enjoy stunning views. Experience unparalleled
          hospitality, personalized service, and convenient access to local
          attractions. Your unforgettable stay awaits at our exquisite hotel.
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
