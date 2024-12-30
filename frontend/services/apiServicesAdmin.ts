import axios from "axios";

const postLogin = (idToken: any) => {
  return axios.post(
    "http://127.0.0.1:8000/api/v1/users/login",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
};

export { postLogin };
