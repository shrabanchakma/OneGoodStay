import { Calendar } from "react-date-range";
import { FaDollarSign } from "react-icons/fa";
import { BsFillCartPlusFill, BsFillHouseDoorFill } from "react-icons/bs";
import { GiPlayerTime } from "react-icons/gi";
import HostSalesLineChart from "./HostSalesLineChart";
import wave from "../../../../assets/wave.webp";
import { useEffect } from "react";
import { getHostAnalyticsData } from "../../../../Api/analytics";
import useUserData from "../../../../Hooks/useUserData";
const HostAnalytics = () => {
  const { userData } = useUserData();
  useEffect(() => {
    getHostAnalyticsData(userData?.email, userData?.timestamp).then((data) => {
      console.log(data);
    });
  }, []);
  return (
    <div>
      <div className="mt-12">
        {/* small cards */}
        <div className="mb-8 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Sales Card */}
          <div className="relative flex  items-start justify-between p-4 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="flex flex-col justify-center ">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 place-items-center rounded-xl grid  bg-gradient-to-r from-sky-600 to-sky-500 shadow-md shadow-sky-500">
                  <FaDollarSign className="w-5 h-5 text-white" />
                </div>
                <p className="font-semibold text-gray-700 ">Total Sales</p>
              </div>
              <p className="font-medium text-gray-700 text-xl">$100</p>
            </div>
            <div className="bg-white ">
              <img src={wave} alt="" className="w-[4rem]" />
              <div>
                <p className="text-green-500 font-semibold text-2xl">45%</p>
                <p className="whitespace-nowrap">this month</p>
              </div>
            </div>
          </div>
          {/* Users Card */}
          <div className="relative flex  items-start justify-between p-4 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="flex flex-col justify-center ">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 place-items-center rounded-xl grid  bg-gradient-to-r from-zinc-600 to-zinc-500 shadow-md shadow-zinc-500">
                  <BsFillCartPlusFill className="w-5 h-5 text-white" />
                </div>
                <p className="font-semibold text-gray-700 ">Total Bookings</p>
              </div>
              <p className="font-medium text-gray-700 text-xl">100</p>
            </div>
            <div className="bg-white ">
              <img src={wave} alt="" className="w-[4rem]" />
              <div>
                <p className="text-green-500 font-semibold text-2xl">70%</p>
                <p className="whitespace-nowrap">this month</p>
              </div>
            </div>
          </div>
          {/* Total Bookings */}
          <div className="relative flex  items-start justify-between p-4 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="flex flex-col justify-center ">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 place-items-center rounded-xl grid  bg-gradient-to-r from-purple-600 to-purple-500 shadow-md shadow-purple-500">
                  <BsFillHouseDoorFill className="w-5 h-5 text-white" />
                </div>
                <p className="font-semibold text-gray-700 ">Total Rooms</p>
              </div>
              <p className="font-medium text-gray-700 text-xl">120</p>
            </div>
            <div className="bg-white ">
              <img src={wave} alt="" className="w-[4rem]" />
              <div>
                <p className="text-rose-500 font-semibold text-2xl">-10%</p>
                <p className="whitespace-nowrap">this month</p>
              </div>
            </div>
          </div>
          {/* Total Rooms */}
          <div className="relative flex  items-start justify-between p-4 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="flex flex-col justify-center ">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 place-items-center rounded-xl grid  bg-gradient-to-r from-cyan-600 to-cyan-500 shadow-md shadow-cyan-500">
                  <GiPlayerTime className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
            <div className="bg-white absolute bottom-3 right-5">
              <p className="font-medium text-gray-500 text-[14px]">
                Host since
              </p>
              <p className="font-medium text-gray-700 text-xl">360 days</p>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {/* Total Sales Graph */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
            <HostSalesLineChart />
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

export default HostAnalytics;
