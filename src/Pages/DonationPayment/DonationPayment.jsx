import { Helmet } from "react-helmet-async";
import Title from "../../Components/Title/Title";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useRef, useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const DonationPayment = () => {
   const amountRef = useRef(null);
   const [totalPrice, setTotalPrice] = useState(null);
   console.log(totalPrice);

   const handleAmountChange = (e) => {
      const amount = e.target.value;
      setTotalPrice(amount);
   };

   return (
      <div className="mt-[68px]">
         <Helmet>
            <title>Donation | SustainEats</title>
         </Helmet>
         {/* title */}
         <Title
            title="Be a Hero by Adding Little"
            supTitle="Our Sincere Thanks"
         ></Title>

         <div className="text-center">
            <label>Enter your donation amount in $: </label>
            <input
               ref={amountRef}
               type="number"
               placeholder="Amount"
               className="border p-2 outline-ourOrange"
               onChange={handleAmountChange}
            />
         </div>

         <div className="max-w-xl mx-auto my-10">
            <Elements stripe={stripePromise}>
               {/* // payment (3) */}
               <CheckoutForm totalPrice={totalPrice}></CheckoutForm>
            </Elements>
         </div>
      </div>
   );
};

export default DonationPayment;
