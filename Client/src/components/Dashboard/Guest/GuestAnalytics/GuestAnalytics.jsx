import { Calendar } from "react-date-range";
import { FaDollarSign } from "react-icons/fa";
import { BsFillCartPlusFill, BsFillHouseDoorFill } from "react-icons/bs";
import { GiPlayerTime } from "react-icons/gi";
import GuestSalesLineChart from "./GuestSalesLineChart";
import { useEffect } from "react";
import { getGuestAnalyticsData } from "../../../../Api/analytics";
import useUserData from "../../../../Hooks/useUserData";
import wave from "../../../../assets/wave.webp";
import { RiArrowUpSFill } from "react-icons/ri";
import { useState } from "react";
const GuestAnalytics = () => {
  const { userData } = useUserData();
  const [analyticsData, setAnalyticsData] = useState({});
  useEffect(() => {
    getGuestAnalyticsData(userData?.email, userData?.timestamp).then(
      (analyticsData) => {
        console.log(analyticsData);
        setAnalyticsData(analyticsData);
      }
    );
  }, []);
  return (
    <div>
      <div className="mt-12">
        {/* small cards */}
        <div className="mb-8 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* total spent card */}
          <div className="relative flex  items-start justify-between p-4 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="flex flex-col justify-center ">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 place-items-center rounded-xl grid  bg-gradient-to-r from-sky-600 to-sky-500 shadow-md shadow-sky-500">
                  <FaDollarSign className="w-5 h-5 text-white" />
                </div>
                <p className="font-semibold text-gray-700 text-2xl">
                  Total Spent
                </p>
              </div>
              <p className="font-medium text-gray-700 text-xl tracking-wider">
                ${analyticsData?.totalSpent}
              </p>
            </div>
            <div className="bg-white ">
              <img src={wave} alt="" className="w-[4rem]" />
            </div>
          </div>
          {/* Total bookings card */}
          <div className="relative flex  items-start justify-between p-4 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="flex flex-col justify-center ">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 place-items-center rounded-xl grid  bg-gradient-to-r from-zinc-600 to-zinc-500 shadow-md shadow-zinc-500">
                  <BsFillCartPlusFill className="w-5 h-5 text-white" />
                </div>
                <p className="font-semibold text-gray-700 ">Total Bookings</p>
              </div>
              <p className="font-medium text-gray-700 text-xl">
                {analyticsData?.totalBookings}
              </p>
            </div>
            <div className="bg-white ">
              <img src={wave} alt="" className="w-[4rem]" />
            </div>
          </div>

          {/* host since */}
          <div className="relative flex  items-start justify-between p-4 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="flex flex-col justify-center w-full">
              <div className="flex items-center justify-between  gap-2 mb-5">
                <div className="w-7 h-7 place-items-center rounded-xl grid  bg-gradient-to-r from-cyan-600 to-cyan-500 shadow-md shadow-cyan-500">
                  <GiPlayerTime className="w-5 h-5 text-white" />
                </div>
                <img src={wave} alt="" className="w-[4rem]" />
              </div>
            </div>
            <div className="bg-white    ">
              <p className="font-medium text-gray-500 text-[14px]">
                Guest since
              </p>
              <p className="font-medium text-gray-700 text-xl">
                {analyticsData?.userSince}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {/* Total Sales Graph */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
            <GuestSalesLineChart />
          </div>
          {/* Calender */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
            <Calendar color="#F43F5E" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestAnalytics;
