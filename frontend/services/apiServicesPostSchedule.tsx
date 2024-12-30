import axios from "@/ultis/axiosInstance";

const postListPostSchedule = (user_id: string) => {
  return axios.post("/api/v1/facebook/get-posts-with-user", { user_id });
};

const postUpdatePostSchedule = (data: any) => {
  return axios.post("/api/v1/facebook/update-post-schedule", data);
};

const getListTokensTransaction = (user_id: string) => {
  return axios.get(`/api/v1/token-history/${user_id}`);
};

export {
  postListPostSchedule,
  postUpdatePostSchedule,
  getListTokensTransaction,
};
