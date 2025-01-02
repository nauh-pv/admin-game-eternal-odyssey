import { UserDataUpdate } from "@/shared/types/commonTypes";
import axios from "@/ultis/axiosInstance";

//Auth
const postLogin = (idToken: any) => {
  return axios.post(
    "users/login",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
};

//User manager
const getAllUsers = () => {
  return axios.get("users");
};

const deleteAUser = (userID: string) => {
  return axios.delete(`users/${userID}`);
};

const patchUpdateUserDetails = (userID: string, dataUpdate: UserDataUpdate) => {
  return axios.patch(`users/${userID}`, dataUpdate);
};

const getUserDetails = (userID: string) => {
  return axios.get(`users/${userID}`);
};

export {
  postLogin,
  getAllUsers,
  deleteAUser,
  patchUpdateUserDetails,
  getUserDetails,
};
