import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";

const MainLayout = () => {
   return (
      <>
         <NavBar></NavBar>
         <Outlet></Outlet>
      </>
   );
};

export default MainLayout;
