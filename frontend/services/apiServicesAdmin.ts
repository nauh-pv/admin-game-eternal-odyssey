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

//World manager
const getAllWorlds = () => {
  return axios.get("worlds");
};

const getWorldDetails = (worldID: string) => {
  return axios.get(`worlds/${worldID}`);
};

const deleteAWorld = (worldID: string) => {
  return axios.delete(`worlds/${worldID}`);
};

const patchUpdateWorldDetails = (worldID: string, dataUpdate: any) => {
  return axios.patch(`worlds/${worldID}`, dataUpdate);
};

const deleteAUserFromWorld = (worldID: string, userID: string) => {
  return axios.delete(`worlds/${worldID}/users/${userID}`);
};

const deleteInventoryFromWorld = (
  worldID: string,
  inventoryID: string,
  userID: string
) => {
  return axios.delete(
    `worlds/${worldID}/users/${userID}/inventory/${inventoryID}`
  );
};

//Quest Manager
const getAllQuests = () => {
  return axios.get("quests");
};

const getQuestDetails = (questID: string) => {
  return axios.get(`quests/${questID}`);
};

const deleteAQuest = (questID: string) => {
  return axios.delete(`quests/${questID}`);
};

const patchUpdateQuestDetails = (questID: string, dataUpdate: any) => {
  return axios.patch(`quests/${questID}`, dataUpdate);
};

const postCreateQuest = (dataCreate: any) => {
  console.log("Check data input:", dataCreate);

  return axios.post("quests", dataCreate);
};

export {
  postLogin,
  getAllUsers,
  deleteAUser,
  patchUpdateUserDetails,
  getUserDetails,
  getAllWorlds,
  getWorldDetails,
  deleteAWorld,
  patchUpdateWorldDetails,
  deleteAUserFromWorld,
  deleteInventoryFromWorld,
  getAllQuests,
  getQuestDetails,
  deleteAQuest,
  patchUpdateQuestDetails,
  postCreateQuest,
};
