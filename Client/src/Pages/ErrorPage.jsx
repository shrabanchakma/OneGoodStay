import { Link } from "react-router-dom";
import Container from "../components/Shared/Container";
import Navbar from "../components/Shared/Navbar";
import { MdError } from "react-icons/md";
import Footer from "../components/Shared/Footer";
const ErrorPage = () => {
  return (
    <Container>
      <Navbar />
      <div className="h-[calc(100vh-185px)] ">
        <div className="min-h-20 bg-[#f3dcb3] border-l-4 border-[#915d0c] p-5">
          <div>
            <div className="flex items-center gap-2">
              <MdError className="text-[#915d0c] text-xl" />
              <h1 className="font-medium text-[#915d0c]">Page not found</h1>
            </div>
            <p className="font-normal text-[#915d0c] w-2/5">
              We apologise, but we cannot find the page you’re looking for.
              Please start your search from{" "}
              <span className="border-b-[1px] border-[#915d0c]">
                <Link to="/">OneGoodStay</Link>’s homepage.
              </span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  );
};

export default ErrorPage;
