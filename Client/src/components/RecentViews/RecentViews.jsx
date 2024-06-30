import Heading from "../Shared/Heading";
import RecentViewsCard from "./RecentViewsCard";

const RecentViews = () => {
  return (
    <div>
      <Heading label="Your recently viewed properties" />
      {/* generate cards here */}
      <div className="grid grid-cols-5 gap-5">
        <RecentViewsCard />
        <RecentViewsCard />
        <RecentViewsCard />
      </div>
    </div>
  );
};

export default RecentViews;
