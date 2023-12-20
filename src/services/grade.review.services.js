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


const GradeService = {
  createGradeReview
}

export default GradeService;