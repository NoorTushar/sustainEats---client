import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const CheckoutForm = ({ totalPrice }) => {
   const stripe = useStripe();
   const elements = useElements();
   const [transactionId, setTransactionId] = useState("");
   const [error, setError] = useState("");
   // payment (15)
   const [clientSecret, setClientSecret] = useState("");
   const axiosSecure = useAxiosSecure();
   const { user } = useAuth();

   // payment (12) - getting error here
   useEffect(() => {
      if (totalPrice > 0) {
         axiosSecure
            .post("/create-payment-intent", { price: totalPrice })
            .then((res) => {
               console.log(res.data.clientSecret);
               // payment (16)
               setClientSecret(res.data.clientSecret);
            })
            .catch((err) => {
               console.log(err);
            });
      }
   }, [axiosSecure, totalPrice]);

   const handleSubmit = async (event) => {
      setError("");
      event.preventDefault();

      // payment (7)
      if (!stripe || !elements) {
         return;
      }

      // payment (8)
      const card = elements.getElement(CardElement);

      if (card === null) {
         return;
      }

      // payment (9)
      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: "card",
         card,
      });

      // payment (10)
      if (error) {
         console.log(`payment error`, error);
         setError(error.message);
      } else {
         console.log(`payment method: `, paymentMethod);
      }

      // payment (17)
      const { paymentIntent, error: cardConfirmError } =
         await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
               card: card,
               billing_details: {
                  email: user?.email || "anonymous",
                  name: user?.displayName || "anonymous",
               },
            },
         });

      if (cardConfirmError) {
         console.log("confirm error");
      } else {
         console.log("payment intent: ", paymentIntent);
         if (paymentIntent.status === "succeeded") {
            console.log("transaction id: ", paymentIntent.id);
            setTransactionId(paymentIntent.id);
         }
      }
   };

   return (
      // payment (5)
      <form onSubmit={handleSubmit}>
         <CardElement
            options={{
               style: {
                  base: {
                     fontSize: "16px",
                     color: "#424770",
                     "::placeholder": {
                        color: "#aab7c4",
                     },
                  },
                  invalid: {
                     color: "#9e2146",
                  },
               },
            }}
         />
         <button
            className="btn btn-sm btn-warning mt-4"
            type="submit"
            // payment (16)
            disabled={!stripe || !clientSecret}
         >
            Pay
         </button>
         {/* // payment (12) */}
         <p className="mt-2 text-red-600">{error}</p>
         {/* // payment (19) */}
         {/* {transactionId && (
            <p className="mt-2 text-green-700">
               Your transaction id: {transactionId}
            </p>
         )} */}
      </form>
   );
};

export default CheckoutForm;
