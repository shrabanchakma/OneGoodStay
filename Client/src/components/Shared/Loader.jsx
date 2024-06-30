import { PropagateLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="w-full h-[70vh] flex items-center justify-center">
      <PropagateLoader color="#e41b43" />
    </div>
  );
};

export default Loader;
