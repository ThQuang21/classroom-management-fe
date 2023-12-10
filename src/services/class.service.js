import http from "./http-config";

// const API_URL = "https://classroom-management-be.vercel.app/";
const API_URL = "http://localhost:3000/";

const createClass = async ({ className, section, subject, room, teacherId }) => {
  return await http.post(API_URL + "classes", {
    className, section, subject, room, teacherId
  });
};

const listClassesByTeacherId = async ({ teacherId }) => {
  return await http.get(API_URL + "classes/" + teacherId);
};


const ClassService = {
  createClass,
  listClassesByTeacherId
}

export default ClassService;