import { Calendar } from "react-date-range";
import AdminSalesLineChart from "./AdminSalesLineChart";
import { FaUser, FaDollarSign } from "react-icons/fa";
import wave from "../../../../assets/wave.webp";
import { BsFillCartPlusFill, BsFillHouseDoorFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { getAdminAnalyticsData } from "../../../../Api/analytics";
import { getLastThreeMonths } from "../../../../Api/utils";

const AdminAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({});
  const [lastThreeMonths, setLastThreeMonths] = useState([]);
  const [lastThreeMonthsRevenue, setLastThreeMonthsRevenue] = useState([]);
  useEffect(() => {
    getAdminAnalyticsData().then((data) => {
      // console.log(data);
      setAnalyticsData(data);
    });
  }, []);
  useEffect(() => {
    const currentDate = new Date();
    const getMonths = getLastThreeMonths([
      currentDate.getMonth() - 1,
      currentDate.getMonth() - 2,
      currentDate.getMonth() - 3,
    ]);
    setLastThreeMonths(getMonths);
  }, []);
  useEffect(() => {
    setLastThreeMonthsRevenue([
      analyticsData?.revenue_three_months_ago,
      analyticsData?.revenue_two_months_ago,
      analyticsData?.revenue_last_month,
    ]);
  }, [analyticsData]);
  return (
    <div className="">
      <div className="md:mt-12 p-2  h-auto">
        {/* small cards */}
        <div className="mb-8 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Sales Card */}
          <div className="relative flex  items-start justify-between p-4 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="flex flex-col justify-center ">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 place-items-center rounded-xl grid  bg-gradient-to-r from-sky-600 to-sky-500 shadow-md shadow-sky-500">
                  <FaDollarSign className="w-5 h-5 text-white" />
                </div>
                <p className="font-semibold text-gray-700 ">Total Revenue</p>
              </div>
              <p className="font-medium text-gray-700 text-xl">
                ${analyticsData?.totalRevenue}
              </p>
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
                  <FaUser className="w-5 h-5 text-white" />
                </div>
                <p className="font-semibold text-gray-700 ">Total Users</p>
              </div>
              <p className="font-medium text-gray-700 text-xl">
                {analyticsData?.totalUsers}
              </p>
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
                  <BsFillCartPlusFill className="w-5 h-5 text-white" />
                </div>
                <p className="font-semibold text-gray-700 ">Total Bookings</p>
              </div>
              <p className="font-medium text-gray-700 text-xl">
                {analyticsData.totalBookings}
              </p>
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
                  <BsFillHouseDoorFill className="w-5 h-5 text-white" />
                </div>
                <p className="font-semibold text-gray-700 ">Total Rooms</p>
              </div>
              <p className="font-medium text-gray-700 text-xl">
                {analyticsData?.totalRooms}
              </p>
            </div>
            <div className="bg-white ">
              <img src={wave} alt="" className="w-[4rem]" />
              <div>
                <p className="text-green-500 font-semibold text-2xl">80%</p>
                <p className="whitespace-nowrap">this month</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3 ">
          {/* Total Sales Graph */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
            <AdminSalesLineChart
              labels={lastThreeMonths}
              data={lastThreeMonthsRevenue}
            />
          </div>
          {/* Calender */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
            <h1 className="font-semibold text-xl px-3 pb-1 pt-3">Calender</h1>
            <Calendar color="#F43F5E" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
