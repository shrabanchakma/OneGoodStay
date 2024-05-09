import { Helmet } from "react-helmet-async";
import Categories from "../../components/Categories/Categories";
import RecentSearch from "../../components/RecentSearch.jsx/RecentSearch";
import RecentViews from "../../components/RecentViews/RecentViews";
import SearchBar from "../../components/SearchBar/SearchBar";

const Home = () => {
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
      </div>
    </>
  );
};

export default Home;
