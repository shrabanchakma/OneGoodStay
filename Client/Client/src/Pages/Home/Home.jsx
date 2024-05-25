import { Helmet } from "react-helmet-async";
import Categories from "../../components/Categories/Categories";
import RecentSearch from "../../components/RecentSearch.jsx/RecentSearch";
import RecentViews from "../../components/RecentViews/RecentViews";
import SearchBar from "../../components/SearchBar/SearchBar";
import Rooms from "../../components/Rooms/Rooms";
import useAuth from "../../Hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <Helmet>
        <title>OneGoodStay | Home</title>
      </Helmet>
      <div className="space-y-14">
        <SearchBar />
        <RecentSearch />
        <RecentViews />
        <Categories />
        <Rooms />
      </div>
    </>
  );
};

export default Home;
