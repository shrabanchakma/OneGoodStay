import { useLoaderData } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchedRoomsSidebar from "./SearchedRoomsSidebar";
import SearchedRoom from "./SearchedRoom";

const SearchedRooms = () => {
  const rooms = useLoaderData();
  console.log("loader rooms -->", rooms);
  return (
    <div>
      <SearchBar />
      <section className="w-full flex items-center mt-5">
        <SearchedRoomsSidebar />
        <div className="bg-slate-100 w-4/5 grid cols-span-1">
          {rooms.map((room, idx) => (
            <SearchedRoom key={idx} room={room} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default SearchedRooms;
