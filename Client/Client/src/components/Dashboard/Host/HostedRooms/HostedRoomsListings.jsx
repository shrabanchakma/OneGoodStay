import { Helmet } from "react-helmet-async";
import useAuth from "../../../../Hooks/useAuth";
import { deleteRoom, getHostedRooms } from "../../../../Api/rooms";
import { useQuery } from "@tanstack/react-query";
import HostedRoomsDataRow from "./HostedRoomsDataRow";
import { useState } from "react";
import Loader from "../../../Shared/Loader";
import toast from "react-hot-toast";

const HostedRoomsListings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  // format date
  const formatDate = (date) => {
    const dateArray = new Date(date).toLocaleDateString().split("/");
    const newDate = `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`;
    return newDate;
  };
  const { data: rooms = [], refetch } = useQuery({
    enabled: !!user?.email,
    queryKey: ["hostedRoom", user?.email],
    queryFn: async () => {
      setLoading(false);
      return await getHostedRooms(user?.email);
    },
  });
  const handleDeleteRoom = async (roomId) => {
    try {
      const { deletedCount } = await deleteRoom(roomId);
      if (deletedCount > 0) {
        toast.success("Room Deleted Successfully");
        refetch();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  if (loading) return <Loader />;
  if (rooms.length === 0) return <div>oops! there is no room</div>;

  return (
    <>
      <Helmet>
        <title>Dashboard | Hosted Rooms</title>
      </Helmet>

      <div className="container mx-auto ">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto overflow-y-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
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
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Hosted Room row data */}
                  {rooms.map((room) => (
                    <HostedRoomsDataRow
                      key={room?._id}
                      room={room}
                      formatDate={formatDate}
                      handleDeleteRoom={handleDeleteRoom}
                    />
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

export default HostedRoomsListings;
