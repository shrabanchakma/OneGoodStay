import React from "react";
import PropTypes from "prop-types";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getBookedRooms } from "../../../Api/rooms";
import Loader from "../../Shared/Loader";
import { Helmet } from "react-helmet-async";
import MyBookingsDataRow from "./MyBookingsDataRow";
import { useEffect } from "react";
import { useState } from "react";

const MyBookings = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("user email---->", user?.email);
  console.log("rooms---->", rooms);
  useEffect(() => {
    getBookedRooms(user?.email).then((roomsData) => {
      setRooms(roomsData);
    });
    setIsLoading(false);
  }, [user?.email]);
  if (isLoading) return <Loader />;
  return (
    <>
      <Helmet>
        <title>Dashboard | My Bookings</title>
      </Helmet>

      <div className="container mx-auto ">
        <div className="lg:py-8 w-full ">
          <div className=" px-4 sm:px-8 py-4 overflow-x-auto w-full  ">
            <div className="overflow-x-auto overflow-y-auto max-h-[600px] w-full">
              <table className="min-w-full leading-normal w-full">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="hidden md:table-cell px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="hidden md:table-cell px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="hidden md:table-cell px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      From
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      To
                    </th>
                    <th
                      scope="col"
                      className="hidden md:table-cell px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* my booking data row */}
                  {rooms.map((room) => (
                    <MyBookingsDataRow key={room?._id} room={room} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

MyBookings.propTypes = {};

export default MyBookings;
