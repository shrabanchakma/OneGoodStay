import { useEffect, useState } from "react";
import Heading from "../Shared/Heading";
import RecentViewsCard from "./RecentViewsCard";
import useAuth from "../../Hooks/useAuth";
import { getVisitedRooms } from "../../Api/rooms";

const RecentViews = () => {
  const { user } = useAuth();
  const [visitedRooms, setVisitedRooms] = useState([]);
  useEffect(() => {
    getVisitedRooms(user?.email).then((data) =>
      setVisitedRooms(data?.visitedRooms)
    );
  }, [user]);
  return (
    <div>
      {visitedRooms.length > 0 && (
        <>
          <Heading label="Your recently viewed rooms" />
          {/* generate cards here */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full md:w-11/12">
            {visitedRooms.map((room, idx) => (
              <RecentViewsCard key={idx} room={room} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RecentViews;
