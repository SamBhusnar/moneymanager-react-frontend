import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import Input from "../Components/Input.jsx";
import { validateEmail } from "../Util/validation";
import axiosConfig from "../Util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

function Login() {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AppContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);

      return;
    }
    if (!password.trim()) {
      setError("Password is required");
      setIsLoading(false);

      return;
    }
    setError(null);
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.login, {
        email,
        password,
      });
      if (response.status === 200) {
        toast.success("Login successful");
        const { token, user } = response.data;
        console.log(user);

        if (token && user) {
          localStorage.setItem("token", JSON.stringify(token));
          setUser(user);
          console.log("user that is log in : ", user);

          setIsLoading(false);

          navigate("/dashboard");
          return;
        }
        setError("Something went wrong , please try again later");
      }
      setIsLoading(false);
      return;
    } catch (error) {
      console.error(" Something went wrong , error : ", error);

      setError(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      console.log(error);

      setIsLoading(false);

      return;
    }
  };
  return (
    <div className="h-screen w-full relative flex items-center  justify-center overflow-hidden ">
      {/* add background image with blur */}
      <img
        src={assets.login_bg}
        alt="login-blur image"
        className="absolute inset-0 w-full h-full object-cover blur-sm"
      />
      <div className="relative z-10 w-full max-w-lg px-6 ">
        {/*add padding block*/}
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl  max-h-[95vh] p-8 overflow-y-auto  ">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Welcome Back
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Please Insert Your Details to Login
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              value={email}
              onChange={setEmail}
              placeholder="jondoe@gmail.com"
              type="email"
            />

            <Input
              label="Password"
              value={password}
              onChange={setPassword}
              placeholder="JonDoePassword34#$34"
              type="password"
            />

            {error && (
              <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </p>
            )}
            <button
              type="submit"
              className={`btn-primary w-full py-3 text-lg font-medium flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-800 transition-colors ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin  w-5 h-5" />
                  Login in ...
                </>
              ) : (
                <>Login</>
              )}
            </button>
            <p className="text-sm text-slate-700 text-center mb-8">
              Don't have an existing account?
              <Link
                to="/signup"
                className="text-primary font-medium underline hover:text-primary-dark transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
