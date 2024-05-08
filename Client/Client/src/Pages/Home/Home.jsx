import RecentSearch from "../../components/RecentSearch.jsx/RecentSearch";
import SearchBar from "../../components/SearchBar/SearchBar";

const Home = () => {
  return (
    <div className="space-y-14">
      <SearchBar />
      <RecentSearch />
    </div>
  );
};

export default Home;
