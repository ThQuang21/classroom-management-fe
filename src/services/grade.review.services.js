import http from "./http-config";

// const API_URL = "https://classroom-management-be.vercel.app/";
const API_URL = "http://localhost:3000/";

const createGradeReview = async ({
                                   classCode,
                                   gradeCompositionId,
                                   studentId,
                                   expectationGrade,
                                   explanation,
                                 } ) => {
  return await http.post(API_URL + "gradeReviews", {
    classCode,
    gradeCompositionId,
    studentId,
    expectationGrade,
    explanation,
  });
};

const getGradeReviewsByClassCodeAndStudentId = async ({
                                   classCode,
                                   studentId
                                 } ) => {
  return await http.get(API_URL + "gradeReviews/" + classCode + "/" + studentId);
};

const addCommentByClassCodeStudentIdAndGradeCompositionId = async ({
                                                                     classCode, studentId, gradeCompositionId, commenter, comment
                                 } ) => {
  return await http.post(API_URL + "gradeReviews/add-comments", {
    classCode, studentId, gradeCompositionId, commenter, comment
  });
};


const GradeService = {
  createGradeReview,
  getGradeReviewsByClassCodeAndStudentId,
  addCommentByClassCodeStudentIdAndGradeCompositionId
}

export default GradeService;