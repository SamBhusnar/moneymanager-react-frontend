import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import { validateEmail } from "../Util/validation";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import ProfileImageSelect from "../Components/ProfileImageSelect";
import { uploadProfileImage } from "../Util/uploadProfileImage";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (!fullName.trim()) {
      setError("Full Name is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    setIsLoading(true);
    let profileImageUrl = "";

    setError(null);
    // signup api call`
    try {
      // upload imag if it present
      if (profilePhoto) {
        const imgurl = await uploadProfileImage(profilePhoto);
        profileImageUrl = imgurl || "";
      }
      const response = await axiosConfig.post(API_ENDPOINTS.register, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      if (response.status === 201) {
        toast.success("Profile created successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
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
            Create An Account
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Start tracking your spendings by with us.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-6">
              {/*  profile image */}
              <ProfileImageSelect
                image={profilePhoto}
                setImage={setProfilePhoto}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 ">
              <Input
                label="Full Name"
                value={fullName}
                onChange={setFullName}
                placeholder="JonDoe"
                type="text"
              />
              <Input
                label="Email"
                value={email}
                onChange={setEmail}
                placeholder="jondoe@gmail.com"
                type="email"
              />
              <div className={"col-span-2"}>
                <Input
                  label="Password"
                  value={password}
                  onChange={setPassword}
                  placeholder="JonDoePassword34#$34"
                  type="password"
                />
              </div>
            </div>
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
                  Sign Up...
                </>
              ) : (
                <>Sign Up</>
              )}
            </button>
            <p className="text-sm text-slate-700 text-center mb-8">
              Already have an account?
              <Link
                to="/login"
                className="text-primary font-medium underline hover:text-primary-dark transition-colors"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
