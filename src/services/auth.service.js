import http from "./http-config";

const API_URL = "https://classroom-management-be.vercel.app/";
// const API_URL = "http://localhost:3000/";
const register = async ({ name, email, password }) => {
  return await http.post(API_URL + "auth/register", {
    name, email, password
  });
};

const activeUser = async ({ email, code }) => {
  const URL = API_URL + "auth/activate/" + email + "/" + code;
  return await http.get(URL);
}

const resentCode = async ({ email }) => {
  return await http.post(API_URL + "auth/activate/resent-code", {
    email
  });
};

const login = async ({ email, password }) => {
  return await http.post(API_URL + "auth/login", {
    email, password
  });
};

const AuthService = {
  register,
  activeUser,
  resentCode,
  login
}

export default AuthService;