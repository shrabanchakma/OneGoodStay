import RecentSearch from "../../components/RecentSearch.jsx/RecentSearch";
import RecentViews from "../../components/RecentViews/RecentViews";
import SearchBar from "../../components/SearchBar/SearchBar";

const Home = () => {
  return (
    <div className="space-y-14">
      <SearchBar />
      <RecentSearch />
      <RecentViews />
    </div>
  );
};

export default Home;
