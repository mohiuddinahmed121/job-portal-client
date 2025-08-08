import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
   baseURL: "https://job-portal-server-blue-seven.vercel.app",
   withCredentials: true,
});

const useAxiosSecure = () => {
   const { signOutUser } = useAuth();
   const navigate = useNavigate();

   useEffect(() => {
      axiosSecure.interceptors.response.use(
         (res) => {
            return res;
         },
         (error) => {
            console.log("error in interceptor", error);

            if (error.status === 401 || error.status === 403) {
               console.log("need to logout the user");
               signOutUser()
                  .then(() => {
                     console.log("user logged out");
                     navigate("/signin");
                  })
                  .catch((error) => console.log(error));
            }
            return Promise.reject(error);
         }
      );
   }, []);

   return axiosSecure;
};

export default useAxiosSecure;
