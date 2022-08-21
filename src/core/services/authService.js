import axios from "axios";
const baseUrl = "api/auth";

const login = async (credentials) => {
  return axios.post(`${baseUrl}/login`, credentials);
};

const register = (data) => {
  return axios.post(`${baseUrl}/register`, data);
};

const authService = {
  login,
  register,
};

export default authService;
