import React, { useRef, useState, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { X, Menu, User, LogOut } from "lucide-react";
import { assets } from "../assets/assets.js";
import SideBar from "./SideBar.jsx";

function MenuBar({ activeMenu }) {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropDownRef = useRef(null);
  const { user, clearUser } = useContext(AppContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    setShowDropdown(false);
    clearUser();
    navigate("/login");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);
  return (
    <>
      <div className="flex items-center justify-between gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
        {/* left side menu button */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => setOpenSideMenu((prev) => !prev)}
            className="block lg:hidden hover:bg-gray-100 p-1 rounded text-black transition-colors"
          >
            {openSideMenu ? (
              <>
                <X className="text-2xl" />
              </>
            ) : (
              <>
                <Menu className="text-2xl" />
              </>
            )}
          </button>
          <div className="flex items-center gap-2">
            <img src={assets.rupee} alt="logo" className="h-10 w-10" />
            <span className="text-lg font-medium text-block truncate">
              Money Manager
            </span>
          </div>
        </div>

        {/* right side contains avatar photo */}
        <div className="relative" ref={dropDownRef}>
          <button
            className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transitions-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2     focus:ring-purple-500"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            {user ? (
              <img
                src={user?.profileImageUrl}
                alt="profile_image_of_top_right_corner"
                className="object-cover w-6 h-6 rounded-full "
              />
            ) : (
              <User className="w-6 h-6 text-gray-500" />
            )}
          </button>
          {/* dropdown menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border-gray-200  py-1 z-50">
              {/* User information */}
              <div className="px-4 py-3 border border-gray-100"></div>
              {/* dropdown options */}

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full ">
                  {user ? (
                    <img
                      src={user?.profileImageUrl}
                      alt="profile_image_of_top_right_corner"
                      className="object-cover w-6 h-6 rounded-full "
                    />
                  ) : (
                    <User className="w-6 h-6 text-gray-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {user?.fullName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="py-1">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transitions-colors duration-150"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>
              </div>
              <div className="py-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transitions-colors duration-150"
                >
                  <LogOut className="w-4 h-4 text-gray-500 " />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
        {/* mobile side menu */}

        {openSideMenu && (
          <div className="fixed  right-0 left-0 bg-white border-b border-gray-200 lg:hidden top-[73px] ">
            <SideBar activeMenu={activeMenu} />
          </div>
        )}
      </div>
    </>
  );
}

export default MenuBar;
