import http from "./http-config";

// const API_URL = "https://classroom-management-be.vercel.app/";
const API_URL = "http://localhost:3000/";
const register = async ({ name, email, password }) => {
  return await http.post(API_URL + "auth/register", {
    name, email, password
  });
};


const AuthService = {
  register
}

export default AuthService;