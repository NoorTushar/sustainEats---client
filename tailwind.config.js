/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         fontFamily: {
            poppins: '"Poppins", sans-serif',
         },
         colors: {
            ourAsh: "#6F7775",
            ourBlack: `#213430`,
            ourPrimary: "#009368",
            ourOrange: "#ECA303",
         },
         backgroundColor: {
            ourOrange: "#ECA303",
         },
         borderColor: {
            ourOrange: "#ECA303",
         },
      },
   },
   plugins: [require("daisyui")],
};
