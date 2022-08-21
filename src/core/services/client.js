import axios from "axios";

import authStorage from "../auth/storage";

const apiClient = axios.create({
  baseURL: "api",
});

apiClient.interceptors.request.use(
  async (options) => {
    options.headers["x-access-token"] = authStorage.getToken();
    return options;
  },
  (error) => {
    console.log("Request error: ", error);
    return Promise.reject(error);
  }
);

export default apiClient;
