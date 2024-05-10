import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const MainLayout = () => {
   return (
      <>
         <NavBar></NavBar>
         <div className="min-h-[calc(100vh-392px)]">
            <Outlet></Outlet>
         </div>
         <Footer></Footer>
      </>
   );
};

export default MainLayout;
