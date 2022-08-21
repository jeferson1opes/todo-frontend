const authKey = "authToken";
const userKey = "userInfo";

const storeData = (info) => {
  localStorage.setItem(authKey, info.token);
  localStorage.setItem(userKey, JSON.stringify(info));
};

const getToken = () => {
  return localStorage.getItem(authKey);
};

const getUser = () => {
  const user = localStorage.getItem(userKey);
  return JSON.parse(user);
};

const removeData = () => {
  localStorage.removeItem(authKey);
  localStorage.removeItem(userKey);
};

const authStorage = {
  storeData,
  getToken,
  getUser,
  removeData,
};

export default authStorage;
