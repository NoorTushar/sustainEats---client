import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = ({ totalAmount }) => {
   const stripe = useStripe();
   const elements = useElements();

   const [error, setError] = useState("");

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
            disabled={!stripe}
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
