import hotelImage from "../../assets/recent-viewed-property-demo.jpg";
const RecentViewsCard = () => {
  return (
    <div className=" border rounded-xl">
      <img src={hotelImage} className="object-cover rounded-t-xl" />
      <p className="text-center font-medium">Family Sweet Home Hotel</p>
    </div>
  );
};

export default RecentViewsCard;
