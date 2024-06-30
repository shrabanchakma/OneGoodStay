import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Container from "../components/Shared/Container";
import Footer from "../components/Shared/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
        <Footer />
      </Container>
    </>
  );
};

export default MainLayout;
