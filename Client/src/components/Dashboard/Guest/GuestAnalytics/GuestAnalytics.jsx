import { Calendar } from "react-date-range";
import { FaDollarSign } from "react-icons/fa";
import { BsFillCartPlusFill, BsFillHouseDoorFill } from "react-icons/bs";
import { GiPlayerTime } from "react-icons/gi";
import GuestSalesDoughnutChart from "./GuestSalesLineChart";
import { useEffect } from "react";
import { getGuestAnalyticsData } from "../../../../Api/analytics";
import useUserData from "../../../../Hooks/useUserData";
import wave from "../../../../assets/wave.webp";
import { RiArrowUpSFill } from "react-icons/ri";
import { useState } from "react";
const colors = [
  "rgb(255, 99, 132)",
  "rgb(54, 162, 235)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(255, 159, 64)",
  "rgb(255, 99, 71)",
  "rgb(60, 179, 113)",
  "rgb(218, 112, 214)",
  "rgb(123, 104, 238)",
];
const GuestAnalytics = () => {
  const { userData } = useUserData();
  const [analyticsData, setAnalyticsData] = useState({});
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartColors, setChartColors] = useState([]);
  useEffect(() => {
    getGuestAnalyticsData(userData?.email, userData?.timestamp).then(
      (analyticsData) => {
        console.log(analyticsData);
        setAnalyticsData(analyticsData);
      }
    );
  }, [userData]);

  useEffect(() => {
    if (analyticsData?.chartData) {
      const labels = analyticsData?.chartData.map((item) => item._id);
      const data = analyticsData?.chartData.map((item) => item.category_sum);
      const chartColors = analyticsData?.chartData.map((_, idx) => colors[idx]);
      setChartLabels(labels);
      setChartData(data);
      setChartColors(colors);
      console.log("this is labels---->", labels);
      console.log("this is data---->", data);
      console.log("this is chartColors---->", chartColors);
    }
  }, [analyticsData]);

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
            <div className="flex flex-col justify-center ">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 place-items-center rounded-xl grid  bg-gradient-to-r from-cyan-600 to-cyan-500 shadow-md shadow-cyan-500">
                  <GiPlayerTime className="w-5 h-5 text-white" />
                </div>
                <p className="font-semibold text-gray-700 ">Guest Since</p>
              </div>
              <p className="font-medium text-gray-700 text-xl">
                {analyticsData?.userSince} Days
              </p>
            </div>
            <div>
              <img src={wave} alt="" className="w-[4rem]" />
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3 ">
          {/* Total Sales Graph */}
          <div className="xl:col-span-2 relative ">
            <p className="text-2xl font-semibold absolute top-0 left-1/2 -translate-x-1/2  z-10 whitespace-nowrap">
              Favorite Categories
            </p>
            <div className="py-10 relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden  ">
              <GuestSalesDoughnutChart
                labels={chartLabels}
                data={chartData}
                backgroundColor={chartColors}
              />
            </div>
          </div>
          {/* Calender */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
            <Calendar color="#F43F5E" className="bg-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestAnalytics;
