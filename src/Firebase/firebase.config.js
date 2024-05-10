import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyBiBWNzXfWI-xue3n72rycA_-GejDEWpeE",
   authDomain: "sustaineats-4027a.firebaseapp.com",
   projectId: "sustaineats-4027a",
   storageBucket: "sustaineats-4027a.appspot.com",
   messagingSenderId: "413123406759",
   appId: "1:413123406759:web:f60944320fc298aa602482",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
