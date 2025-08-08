import React, { useEffect, useState } from "react";
import {
   createUserWithEmailAndPassword,
   GoogleAuthProvider,
   onAuthStateChanged,
   signInWithEmailAndPassword,
   signInWithPopup,
   signOut,
} from "firebase/auth";
import auth from "../../firebase/firebase.init";
import AuthContext from "./AuthContext";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
   const [user, setUser] = useState();
   const [loading, setLoading] = useState();

   const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
   };

   const signInUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
   };

   const signInWithGoogle = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
   };

   const signOutUser = () => {
      setLoading(true);
      return signOut(auth);
   };

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
         if (currentUser?.email) {
            const user = { email: currentUser.email };
            axios
               .post("https://job-portal-server-blue-seven.vercel.app/jwt", user, {
                  withCredentials: true,
               })
               .then((res) => {
                  console.log(res.data);
                  setLoading(false);
               });
         } else {
            axios
               .post(
                  "https://job-portal-server-blue-seven.vercel.app/logout",
                  {},
                  { withCredentials: true }
               )
               .then((res) => {
                  console.log(res.data);
                  setLoading(false);
               });
         }
      });

      return () => {
         unsubscribe();
      };
   }, []);

   const authInfo = {
      user,
      loading,
      createUser,
      signInUser,
      signOutUser,
      signInWithGoogle,
   };
   return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
