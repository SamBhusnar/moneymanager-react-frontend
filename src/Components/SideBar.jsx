import React, { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";

function SideBar({ activeMenu }) {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
 
  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 p-5 sticky top-[61px] z-20 ">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {console.log(user?.profileImageUrl)}
        {user?.profileImageUrl ? (
          // add profileimageUrl
          <img
            src={user.profileImageUrl || ""}
            alt="profile image"
            className="w-10 h-10 bg-slate-400 rounded-full"
          />
        ) : (
          <User className="w-20 h-20 text-xl" />
        )}
        <h5 className="text-gray-950 font-medium leading-6 capitalize mb-6">
          {user?.fullName || "Your Name"}
        </h5>
        {SIDE_BAR_DATA &&
          SIDE_BAR_DATA.map((item, index) => {
            return (
              <button
                className={`w-full flex items-center gap-4 text-[15px]    py-3 px-6 rounded-lg cursor-pointer hover:bg-gray-500 mb-3 transition-colors ${
                  activeMenu === item.label
                    ? "text-white bg-purple-700 hover:bg-purple-700"
                    : ""
                }  `}
                key={`menu-${index}`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="text-2xl" />
                {item.label}
              </button>
            );
          })}
      </div>
    </div>
  );
}

export default SideBar;
