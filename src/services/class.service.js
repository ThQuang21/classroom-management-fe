import http from "./http-config";

const API_URL = "https://classroom-management-be.vercel.app/";
// const API_URL = "http://localhost:3000/";

const createClass = async ({ className, section, subject, room, teacherId }) => {
  return await http.post(API_URL + "classes", {
    className, section, subject, room, teacherId
  });
};

const listClassesByTeacherId = async ({ teacherId }) => {
  return await http.get(API_URL + "classes/list-classes-by-teacher/" + teacherId);
};

const listClassesByStudentId = async ({ studentId }) => {
  return await http.get(API_URL + "classes/list-classes-by-student/" + studentId);
};

const getClassByClassCode = async ({ classCode }) => {
  return await http.get(API_URL + "classes/" + classCode);
};

const joinClassByLink = async ({ classCode, invitationCode, userId }) => {
  return await http.post(API_URL + "classes/join-class", {
    classCode, invitationCode, userId
  });
};

const joinClassByCode = async ({ invitationCode, userId }) => {
  return await http.post(API_URL + "classes/join-class-by-code", {
    invitationCode, userId
  });
};

const listPeopleByClassCode = async ({ classCode }) => {
  return await http.get(API_URL + "classes/get-people/" + classCode);
};

const inviteByEmail = async ({ name, email, classCode, teacherName, isTeacher }) => {
  return await http.post(API_URL + "classes/invite-by-email", {
    email, classCode, isTeacher
  });
};

const updateGradeCompositionByClassCode = async ({ gradeCompositions, classCode }) => {
  return await http.put(API_URL + "classes/" + classCode + "/gradeCompositions", {
    gradeCompositions
  });
};
const getGradeCompositionByClassCode = async ({ classCode }) => {
  return await http.get(API_URL + "classes/" + classCode + "/gradeCompositions");
};

const ClassService = {
  createClass,
  listClassesByTeacherId,
  listClassesByStudentId,
  getClassByClassCode,
  joinClassByLink,
  joinClassByCode,
  listPeopleByClassCode,
  inviteByEmail,
  updateGradeCompositionByClassCode,
  getGradeCompositionByClassCode
}

export default ClassService;