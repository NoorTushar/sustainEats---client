import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
   GithubAuthProvider,
   GoogleAuthProvider,
   createUserWithEmailAndPassword,
   onAuthStateChanged,
   signInWithEmailAndPassword,
   signInWithPopup,
   signOut,
   updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import useAxiosSecure from "../Hooks/useAxiosSecure";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
   const axiosSecure = useAxiosSecure();

   // current user:
   const [user, setUser] = useState(null);

   // loader for loading till we get the user
   const [loading, setLoading] = useState(true);

   // create firebase user
   const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
   };

   // login using firebase email and password
   const loginUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
   };

   // updating user with username and password
   const updateUser = (userName, userPhoto) => {
      setLoading(true);
      return updateProfile(auth.currentUser, {
         displayName: userName,
         photoURL: userPhoto,
      });
   };

   // login with Google using firebase
   const loginWithGoogle = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
   };

   const loginWithGitHub = () => {
      setLoading(true);
      return signInWithPopup(auth, gitHubProvider);
   };

   // logout
   const logoutUser = () => {
      return signOut(auth);
   };

   // observe user of firebase
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         /*** JWT Steps Start - 1 *** */
         // getting the email for JWT
         const userEmail = currentUser?.email || user?.email;
         // object e convert kortesi to pass the JSON object to the backend
         // to create a token
         const loggedUser = { email: userEmail };
         /*** JWT Steps End *** */

         console.log("this is the current user: ", currentUser);
         setUser(currentUser);
         setLoading(false);

         /*** JWT Steps Start - 2 *** */
         // generating jwt token if user is available
         if (currentUser) {
            axiosSecure
               .post("/jwt", loggedUser)
               .then((res) => {
                  console.log(res.data);
               })
               .catch((err) => {
                  console.log(err);
               });
         }
         /*** JWT Steps End *** */
      });

      return () => {
         unsubscribe();
      };
   }, []);

   const allValues = {
      loading,
      createUser,
      updateUser,
      loginUser,
      loginWithGoogle,
      logoutUser,
      user,
      setLoading,
      loginWithGitHub,
   };
   return (
      <AuthContext.Provider value={allValues}>{children}</AuthContext.Provider>
   );
};

AuthProvider.propTypes = {
   children: PropTypes.node,
};

export default AuthProvider;
