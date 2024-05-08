import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Container from "../components/Shared/Container";

const MainLayout = () => {
  return (
    <>
      <Container>
        <Navbar />
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
