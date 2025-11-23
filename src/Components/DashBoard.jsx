import React, { useEffect } from "react";
import MenuBar from "./MenuBar.jsx";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import SideBar from "./SideBar.jsx";

function DashBoard({ children, activeMenu }) {
  const { user } = useContext(AppContext);
  useEffect(() => {
    console.log("component is loaded DashBoard ! ");
  }, []); //
  return (
    <>
      <MenuBar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            {/* sidebar content */}
            {console.log("before side bar")}
            <SideBar activeMenu={activeMenu} />
            {console.log("after side bar")}
          </div>
          <div className="gow w-full">{children}</div>
        </div>
      )}
    </>
  );
}

export default DashBoard;
