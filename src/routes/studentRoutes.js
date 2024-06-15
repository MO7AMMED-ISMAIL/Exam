const express = require("express");
const router = express.Router();
const {isAdmin,canUpdateData} = require("../midelware/authorized")


const studentController = require("../controllers/StudentContoller");
const resultValidator = require("../midelware/resultValidator");
const {
    insertValidator,
    updateValidator,
    deleteValidator,
    getValidator,
}= require("../midelware/student/studentValidator");


router.route("/students")
    .get(isAdmin,studentController.getAllStudents)
    .post(isAdmin,insertValidator, resultValidator,studentController.createStudent)
    .put(canUpdateData,updateValidator, resultValidator,studentController.updateStudent);

router.route("/students/:id")
    .get(canUpdateData,getValidator, resultValidator,studentController.getStudent)
    .delete(isAdmin,deleteValidator, resultValidator,studentController.deleteStudent);


module.exports = router;