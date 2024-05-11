import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const MainLayout = () => {
   return (
      <>
         <div className="fixed top-0 left-0 w-full z-10">
            <NavBar></NavBar>
         </div>
         <div className="min-h-[calc(100vh-392px)]">
            <Outlet></Outlet>
         </div>
         <Footer></Footer>
      </>
   );
};

export default MainLayout;
