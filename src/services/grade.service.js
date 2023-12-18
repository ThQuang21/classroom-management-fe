import http from "./http-config";

// const API_URL = "https://classroom-management-be.vercel.app/";
const API_URL = "http://localhost:3000/";

const createGrade = async ({ students, classCode }) => {
  return await http.post(API_URL + "grades/createManyByImport", {
    students, classCode
  });
};

const getGradesByClassCode = async ({ classCode }) => {
  return await http.get(API_URL + "grades/" + classCode);
};

const getGradesByGradeComposition = async ({ gradeComposition }) => {
  return await http.get(API_URL + "grades/grade-composition/" + gradeComposition);
};

const updateGradesByClassCodeAndStudentId = async ({ classCode, gradesToUpdate }) => {
  return await http.put(API_URL + "grades/updateGrades/" + classCode, {
    gradesToUpdate
  });
};

const GradeService = {
  createGrade,
  getGradesByClassCode,
  getGradesByGradeComposition,
  updateGradesByClassCodeAndStudentId
}

export default GradeService;