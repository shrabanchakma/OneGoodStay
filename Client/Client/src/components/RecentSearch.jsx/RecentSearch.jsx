import Heading from "../Shared/Heading";
import RecentSearchCard from "./RecentSearchCard";

const RecentSearch = () => {
  return (
    <div>
      <Heading label="Your recent searches" />
      <div className="grid grid-cols-4 ">
        <RecentSearchCard />
      </div>
    </div>
  );
};

export default RecentSearch;
