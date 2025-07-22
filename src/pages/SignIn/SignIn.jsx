import Lottie from "lottie-react";
import LoginLotttieJson from "../../assets/lottie/login.json";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import SocialLogin from "../shared/SocialLogin";
import { useLocation, useNavigate } from "react-router-dom";

const SignIn = () => {
   const { signInUser } = useContext(AuthContext);
   const location = useLocation();
   const navigate = useNavigate();
   const from = location.state || "/";

   const handleSignin = (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;

      // password vallidation

      // show password validation

      signInUser(email, password)
         .then((result) => {
            console.log("sign in", result);
            navigate(from);
         })
         .catch((error) => {
            console.log(error);
         });
   };
   return (
      <div className="hero bg-base-200 min-h-screen">
         <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left w-96">
               <Lottie animationData={LoginLotttieJson}></Lottie>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
               <h1 className="ml-8 mt-4 text-5xl font-bold">Sign In now!</h1>
               <div className="card-body">
                  <form onSubmit={handleSignin} className="fieldset">
                     <label className="label">Email</label>
                     <input type="email" name="email" className="input" placeholder="Email" />
                     <label className="label">Password</label>
                     <input
                        type="password"
                        name="password"
                        className="input"
                        placeholder="Password"
                     />
                     <div>
                        <a className="link link-hover">Forgot password?</a>
                     </div>
                     <button className="btn btn-neutral mt-4">Sign In</button>
                  </form>
                  <SocialLogin></SocialLogin>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SignIn;
