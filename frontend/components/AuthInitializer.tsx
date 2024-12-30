import { setAccessToken, setUser } from "@/shared/redux/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { RootState } from "@/shared/redux/store";

interface decodedUser {
  username: string;
  user_id: number;
  user_email: string;
  partner_id: number;
  role: string;
}

interface UserState {
  username: string;
  userId: number;
  userEmail: string;
  partnerId: number;
  role: string;
}

const AuthInitializer = () => {
  const dispatch = useDispatch();
  const currentAccessToken = useSelector(
    (state: RootState) => state.auth.accessToken
  );
  const currentUser = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localAccessToken = localStorage.getItem("accessToken");
      const sessionAccessToken = sessionStorage.getItem("accessToken");
      const accessToken = localAccessToken || sessionAccessToken;

      if (accessToken) {
        const decodedUser: decodedUser = jwtDecode<decodedUser>(accessToken);

        const userData: UserState = {
          username: decodedUser.username,
          userId: decodedUser.user_id,
          userEmail: decodedUser.user_email,
          partnerId: decodedUser.partner_id,
          role: decodedUser.role,
        };

        if (
          accessToken !== currentAccessToken ||
          JSON.stringify(currentUser) !== JSON.stringify(userData)
        ) {
          dispatch(setUser(userData));
          dispatch(setAccessToken(accessToken));
        }
      }
    }
  }, [dispatch]);

  return null;
};

export default AuthInitializer;
