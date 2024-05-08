import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Container from "../components/Shared/Container";
import Footer from "../components/Shared/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Container>
        <div className="min-h-[calc(100vh-137px)]">
          <Outlet />
        </div>
        <Footer />
      </Container>
    </>
  );
};

export default MainLayout;
