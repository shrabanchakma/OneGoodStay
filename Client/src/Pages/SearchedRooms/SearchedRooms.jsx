import { useLoaderData } from "react-router-dom";

const SearchedRooms = () => {
  const data = useLoaderData();
  console.log("loader data -->", data);
  return <div>hi</div>;
};

export default SearchedRooms;
