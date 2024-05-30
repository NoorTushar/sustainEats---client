import { Helmet } from "react-helmet-async";
import Title from "../../Components/Title/Title";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const DonationHistory = () => {
   const { user } = useAuth();
   const axiosSecure = useAxiosSecure();

   const { data: payments = [] } = useQuery({
      queryKey: ["payments", user.email],
      queryFn: async () => {
         const res = await axiosSecure.get(`/payments/${user.email}`);
         return res.data;
      },
   });

   return (
      <div className="mt-[68px]">
         <Helmet>
            <title>Your Donation | SustainEats</title>
         </Helmet>
         {/* title */}
         <Title
            title="Your Contributions"
            supTitle="Our Sincere Thanks"
         ></Title>

         <h2 className="text-center mb-4">
            Your Total Donations: $
            {payments.reduce(
               (total, item) => total + parseFloat(item.price),
               0
            )}
         </h2>
         <div className="overflow-x-auto max-w-4xl mx-auto">
            <table className="table table-zebra">
               {/* head */}
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Amount</th>
                     <th>Transaction Id</th>
                     <th>Date</th>
                  </tr>
               </thead>
               <tbody>
                  {payments.map((payment, index) => (
                     <tr key={payment._id}>
                        <th>{index + 1}</th>
                        <td>${payment.price}</td>
                        <td>{payment.transactionId}</td>
                        <td>{payment.date}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default DonationHistory;
