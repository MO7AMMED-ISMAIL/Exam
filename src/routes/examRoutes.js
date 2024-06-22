const express = require("express");
const router = express.Router();
const examController = require("../controllers/examController")
const resultValdation = require("../midelware/resultValidator");
const {
    createExamValidator,
    getExamByIdValidator,
    updateExamValidator
} = require("../midelware/exam/examValidator")

const {isAdmin,All,} = require("../midelware/authorized");


router.route("/exams")
    .get(All,examController.getAllExams)
    .post(isAdmin,createExamValidator,resultValdation,examController.createExams);

router.route("/exams/:id")
    .get(All,getExamByIdValidator,resultValdation,examController.startExam)
    .put(isAdmin,updateExamValidator,resultValdation,examController.updateExam)
    .delete(isAdmin,getExamByIdValidator,resultValdation,examController.deleteExam);

router.route("/examsById/:id")
    .get(All,getExamByIdValidator,resultValdation,examController.getExamById);

router.route("/exams/subject/:subjectId")
    .get(All,examController.getExamsBySubjectId);

module.exports = router;