import logo from "../assets/logo_with_brandName_sustainEats.png";
import { FaFacebookF, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
   return (
      <footer className="footer footer-center p-10 gap-4">
         <aside>
            <img className="size-24" src={logo} alt="" />
            <p className="font-bold text-ourBlack">
               <span className="text-ourPrimary">Sustain</span>
               <span className="text-ourOrange">Eats</span> - Surplus food
               sharing platform.
            </p>
            <p className="text-ourBlack">
               Copyright © {new Date().getFullYear()} - All right reserved
            </p>
            <p className="text-ourBlack">
               Website by{" "}
               <strong>
                  <a
                     className="text-ourOrange"
                     href="https://www.facebook.com/NoorTusharKhan/"
                  >
                     Noor Tushar Khan
                  </a>
               </strong>
            </p>
         </aside>
         <nav>
            <div className="grid grid-flow-col gap-4">
               {/* facebook */}
               <a
                  href="https://www.facebook.com/NoorTusharKhan/"
                  target="_blank"
                  className="size-11 border-[0.1px] border-ourOrange bg-opacity-80 rounded-full flex justify-center items-center bg-ourOrange cursor-pointer duration-300 hover:bg-ourPrimary hover:border-ourPrimary "
               >
                  <FaFacebookF className="group text-ourBlack  text-sm"></FaFacebookF>
               </a>

               {/* linkedin */}
               <a
                  href="https://www.linkedin.com/in/noortushar/"
                  target="_blank"
                  className="size-11 border-[0.1px] border-ourOrange bg-opacity-80 rounded-full flex justify-center items-center bg-ourOrange cursor-pointer duration-300 hover:bg-ourPrimary hover:border-ourPrimary "
               >
                  <FaLinkedin className="text-ourBlack text-lg"></FaLinkedin>
               </a>

               {/* github */}
               <a
                  href="https://github.com/NoorTushar"
                  target="_blank"
                  className="size-11 border-[0.1px] border-ourOrange bg-opacity-80 rounded-full flex justify-center items-center bg-ourOrange cursor-pointer duration-300 hover:bg-ourPrimary hover:border-ourPrimary "
               >
                  <FaGithub className="text-ourBlack text-lg"></FaGithub>
               </a>

               {/* twitter */}
               <a
                  href="https://twitter.com/NoorTusharKhan"
                  target="_blank"
                  className="size-11 border-[0.1px] border-ourOrange bg-opacity-80 rounded-full flex justify-center items-center bg-ourOrange cursor-pointer duration-300 hover:bg-ourPrimary hover:border-ourPrimary "
               >
                  <FaXTwitter className="text-ourBlack text-base"></FaXTwitter>
               </a>
            </div>
         </nav>
      </footer>
   );
};

export default Footer;
