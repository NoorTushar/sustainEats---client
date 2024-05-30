import { Link } from "react-router-dom";
import Title from "../Title/Title";

const DonationSection = () => {
   return (
      <div
         style={{
            backgroundImage: `url(https://i.ibb.co/HFnzb14/heart-donation.jpg)`,
         }}
         className="min-h-[200px] bg-center bg-cover bg-no-repeat bg-black bg-opacity-50 bg-blend-overlay bg-fixed py-12 md:py-20"
      >
         <div className="text-white">
            <Title title="Be a Hero" supTitle="Make a Donation"></Title>
         </div>

         <div className="grid p-6 pt-0 grid-cols-3 items-center gap-6">
            <p className="md:pl-20 lg:pl-32 text-white col-span-3 md:col-span-2">
               Your generous donation can help us in our mission to reduce food
               waste and ensure that surplus food reaches those in need. By
               contributing, you are not only helping to sustain our platform
               but also making a significant impact on the lives of many
               individuals and families who struggle with food insecurity.
            </p>
            <div className="text-center col-span-3 md:col-span-1">
               <Link
                  to={`/`}
                  className=" px-5 py-2 relative rounded group lightButton overflow-hidden font-medium bg-ourOrange text-ourBlack inline-block border border-ourOrange"
               >
                  <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full "></span>
                  <span className="relative">Make Donation</span>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default DonationSection;
