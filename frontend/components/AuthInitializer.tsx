import { setAccessToken, setUser } from "@/shared/redux/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { RootState } from "@/shared/redux/store";
import { postLogin } from "@/services/apiServicesAdmin";
import { UserState } from "@/shared/types/commonTypes";

const AuthInitializer = () => {
  const dispatch = useDispatch();
  const currentAccessToken = useSelector(
    (state: RootState) => state.auth.accessToken
  );
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const verifyToken = async (accessToken: string) => {
    try {
      const res = await postLogin(accessToken);

      if (res.status === 200 && res.data.role === "admin") {
        const decodedUser: any = jwtDecode<any>(accessToken);

        const userData: UserState = {
          name: decodedUser.name,
          userId: decodedUser.user_id,
          email: decodedUser.email,
          role: res.data.role,
        };

        if (
          accessToken !== currentAccessToken ||
          JSON.stringify(currentUser) !== JSON.stringify(userData)
        ) {
          dispatch(setUser(userData));
          dispatch(setAccessToken(accessToken));
        }
      }
    } catch (error) {
      console.log("error verifyToken:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localAccessToken = localStorage.getItem("accessToken");
      const sessionAccessToken = sessionStorage.getItem("accessToken");
      const accessToken = localAccessToken || sessionAccessToken;

      if (accessToken) {
        verifyToken(accessToken);
      }
    }
  }, [dispatch]);

  return null;
};

export default AuthInitializer;
