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

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
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
         console.log("this is the current user: ", currentUser);
         setUser(currentUser);
         setLoading(false);
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
