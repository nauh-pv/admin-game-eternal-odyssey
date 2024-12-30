import axios from "@/ultis/axiosInstance";
import axiosDefault from "axios";

const postUploadFile = (user_id: string, file: File) => {
  const formData = new FormData();
  formData.append("user_id", user_id);
  formData.append("file", file);
  const res = axios.post("api/v1/facebook/upload-files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    timeout: 0,
  });
  return res;
};

const getFileUpload = (user_id: string) => {
  return axios.get(`api/v1/facebook/get-collection/${user_id}`, {
    headers: {
      "Content-Type": "",
    },
  });
};

const postVerifyEmail = (user_email: string) => {
  return axios.post("verify_email", { user_email });
};

const postRegisterAccount = (
  user_name: string,
  user_pass: string,
  user_email: string,
  verification_code: string,
  account_type: string
) => {
  return axios.post("register_account", {
    user_name,
    user_pass,
    user_email,
    verification_code,
    account_type,
  });
};

const postLogin = (username: string, password: string) => {
  return axios.post("login", {
    username,
    password,
  });
};

const postLogout = () => {
  return axios.post("logout");
};

const postDeleteFile = (user_id: string, collection_id: string[]) => {
  return axios.post("api/v1/facebook/delete-collection", {
    user_id,
    collection_id,
  });
};

const getListPage = () => {
  return axios.get("api/v1/facebook/page/access-token-pages");
};

const postSaveFileToPage = (
  list_page_ids: string[],
  list_collections: any[]
) => {
  const listCollections = list_collections.map((item) => {
    if (item.collectionName) {
      return {
        collection_name: item.collectionName,
        file_name: item.fileName,
      };
    }
  });

  console.log("List select", listCollections);

  return axios.post("api/v1/facebook/save-collection-page", {
    list_page_ids,
    list_collections: listCollections,
  });
};

const postSubscribeAutoReply = (
  user_id: string,
  page_id: string,
  page_access_token: string,
  type: string,
  action: number
) => {
  if (type === "Subscribe Message" || type === "Unsubscribe Message") {
    type = "messages";
  } else if (type === "Subscribe Comment" || type === "Unsubscribe Comment") {
    type = "comments";
  }
  console.log(user_id, page_id, page_access_token, type, action);

  return axios.post("/api/v1/facebook/subscribed", {
    user_id,
    page_id,
    page_access_token,
    type,
    action,
  });
};

const postCollectionPage = (page_id: string[]) => {
  return axios.post(`api/v1/facebook/get-collection-page/`, { page_id });
};

const postCreateLinkDeposit = (user_id: number, amount: number) => {
  return axios.post("api/v1/deposit", { user_id, amount });
};

const getStatusPayment = (order_id: string, user_id: number) => {
  return axios.get(`api/v1/payment-status/${order_id}?user_id=${user_id}`);
};

const getTotalBalance = (user_id: number) => {
  return axios.get(`api/v1/total-balance/${user_id}`);
};

const getPaymentHistory = (user_id: number) => {
  return axios.get(`api/v1/deposit-history/${user_id}`);
};

//page manager

const postCreateManagerConfig = (
  user_id: number,
  page_id: string,
  page_name: string,
  username: string,
  files: any,
  config_id: string,
  action: string[]
) => {
  return axios.post("api/v1/facebook/page/create-manager", {
    user_id,
    page_id,
    page_name,
    username,
    files,
    config_id,
    action,
  });
};

const postUpdateManagerConfig = (
  user_id: number,
  manager_id: string,
  username: string,
  page_id: string,
  page_name: string,
  files: any[],
  config_id: string,
  action: number
) => {
  if (!Array.isArray(files)) {
    console.error("files is not an array:", files);
    files = [];
  }

  const filesNew = files.map((item: any) => {
    return {
      collection_name: item.collectionName,
      file_name: item.fileName,
    };
  });
  console.log(
    user_id,
    manager_id,
    username,
    page_id,
    page_name,
    files,
    filesNew,
    config_id,
    action
  );

  return axios.post("api/v1/facebook/page/update-manager", {
    user_id,
    manager_id,
    username,
    page_id,
    page_name,
    files: filesNew,
    config_id,
    action,
  });
};

const postDeleteManagerConfig = (user_id: number, manager_id: string) => {
  return axios.post("api/v1/facebook/page/delete-manager", {
    user_id,
    manager_id,
  });
};

const postListManagerConfig = (user_id: string, page_data: any[]) => {
  return axios.post("api/v1/facebook/page/get-manager", {
    user_id,
    page_data,
  });
};

const postManagerConfig = (user_id: number, manager_id: string) => {
  return axios.post("api/v1/facebook/page/get-manager-by-id", {
    user_id,
    manager_id,
  });
};

//identity manager
const postCreateIdentity = (
  user_id: number,
  name: string,
  info: string,
  story: string,
  style_conversation: string,
  example_conversation: string
) => {
  return axios.post("api/v1/facebook/config/create-identity", {
    user_id,
    name,
    info,
    story,
    style_conversation,
    example_conversation,
  });
};

const postUpdateIdentity = (
  user_id: number,
  identity_id: string,
  name: string,
  info: string,
  story: string,
  style_conversation: string,
  example_conversation: string
) => {
  return axios.post("api/v1/facebook/config/update-identity", {
    user_id,
    identity_id,
    name,
    info,
    story,
    style_conversation,
    example_conversation,
  });
};

const postDeleteIdentity = (user_id: number, identity_id: string) => {
  return axios.post("api/v1/facebook/config/delete-identity", {
    user_id,
    identity_id,
  });
};

const getIdentity = (user_id: number) => {
  return axios.get(`api/v1/facebook/config/get-identity?user_id=${user_id}`);
};

//procedure manager
const postCreateProcedure = (
  user_id: number,
  name: string,
  procedure: string
) => {
  return axios.post("/api/v1/facebook/config/create-procedure", {
    user_id,
    name,
    procedure,
  });
};

const postUpdateProcedure = (
  user_id: number,
  procedure_id: string,
  name: string,
  procedure: string
) => {
  return axios.post("/api/v1/facebook/config/update-procedure", {
    user_id,
    procedure_id,
    name,
    procedure,
  });
};

const postDeleteProcedure = (user_id: number, procedure_id: string) => {
  return axios.post("/api/v1/facebook/config/delete-procedure", {
    user_id,
    procedure_id,
  });
};

const getProcedure = (user_id: number) => {
  return axios.get(`api/v1/facebook/config/get-procedure?user_id=${user_id}`);
};

//config
const postCreateConfig = (
  user_id: number,
  name: string,
  procedure_id: string,
  identity_id: string,
  role: string,
  target: string,
  mission: string,
  note: string
) => {
  return axios.post("/api/v1/facebook/config/create", {
    user_id,
    name,
    procedure_id,
    identity_id,
    role,
    target,
    mission,
    note,
  });
};

const postUpdateConfig = (
  user_id: number,
  total_id: string,
  name: string,
  procedure_id: string,
  identity_id: string,
  role: string,
  target: string,
  mission: string,
  note: string
) => {
  return axios.post("/api/v1/facebook/config/update", {
    user_id,
    name,
    total_id,
    procedure_id,
    identity_id,
    role,
    target,
    mission,
    note,
  });
};

const postDeleteConfig = (user_id: number, total_id: string) => {
  return axios.post("/api/v1/facebook/config/delete", {
    user_id,
    total_id,
  });
};

const getListConfig = (user_id: number) => {
  return axios.get(`api/v1/facebook/config/get?user_id=${user_id}`);
};

const getCreateDefaultConfig = (user_id: number) => {
  return axios.get(`api/v1/facebook/config/default?user_id=${user_id}`);
};

//schedule post
const postGeneratePost = (user_id: string, page_id: string, topic: string) => {
  return axios.post("api/v1/facebook/generate-post", {
    user_id,
    page_id,
    topic,
  });
};

const postAutoPost = (
  user_id: string,
  page_id: string,
  topic: string,
  image_urls: string[],
  scheduled_publish_time: string,
  repeat: number,
  times: number
) => {
  console.log(
    "Check data get API:",
    user_id,
    page_id,
    topic,
    image_urls,
    scheduled_publish_time,
    repeat,
    times
  );

  return axios.post(
    "api/v1/facebook/auto-post",
    {
      user_id,
      page_id,
      topic,
      image_urls,
      scheduled_publish_time,
      repeat,
      times,
    },
    {
      timeout: 1000000,
    }
  );
};

const postAutoPostWithContent = (
  user_id: string,
  page_id: string,
  content: string,
  image_url: string,
  scheduled_publish_time: string
) => {
  return axios.post("api/v1/facebook/auto-post-with-content", {
    user_id,
    page_id,
    content,
    image_url,
    scheduled_publish_time,
  });
};

//image manager
const postUploadImages = (user_id: string, page_id: string, files: File[]) => {
  const formData = new FormData();
  formData.append("user_id", user_id);
  files.forEach((file: any) => {
    formData.append("files", file);
  });
  formData.append("page_id", page_id);
  return axios.post("api/v1/facebook/upload-images-to-s3", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getImagesByUser = (user_id: number) => {
  return axios.get(`api/v1/facebook/images/get-by-userid?user_id=${user_id}`);
};

const postDeleteImage = (image_id: number) => {
  return axios.post("api/v1/facebook/images/delete", { image_id });
};

export {
  postUploadFile,
  getFileUpload,
  postVerifyEmail,
  postRegisterAccount,
  postLogin,
  postLogout,
  postDeleteFile,
  getListPage,
  postSaveFileToPage,
  postSubscribeAutoReply,
  postCollectionPage,
  postCreateLinkDeposit,
  getStatusPayment,
  getTotalBalance,
  getPaymentHistory,
  postCreateManagerConfig,
  postUpdateManagerConfig,
  postDeleteManagerConfig,
  postListManagerConfig,
  postManagerConfig,
  postCreateIdentity,
  postUpdateIdentity,
  postDeleteIdentity,
  getIdentity,
  postCreateProcedure,
  postUpdateProcedure,
  postDeleteProcedure,
  getProcedure,
  postCreateConfig,
  postUpdateConfig,
  postDeleteConfig,
  getListConfig,
  getCreateDefaultConfig,
  postGeneratePost,
  postAutoPost,
  postAutoPostWithContent,
  postUploadImages,
  getImagesByUser,
  postDeleteImage,
};
