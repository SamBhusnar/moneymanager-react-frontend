import { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import { useNavigate } from "react-router-dom";

export const useUser = () => {
  const { user, setUser, clearUser } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      return;
    }

    let isMounted = true;
    const fetchUser = async () => {
      try {
        const response = await axiosConfig.get(API_ENDPOINTS.get_user_info);
        console.log(response.data);

        if (isMounted && response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.log("error appeared in useUser hook", error);
        if (isMounted) {
          clearUser();
          //   navigate("/login");
        }
      }
    };
    fetchUser();
    return () => {
      isMounted = false;
    };
  }, [setUser, clearUser, navigate]);
  return user;
};
