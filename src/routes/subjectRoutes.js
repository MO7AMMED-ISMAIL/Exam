const express = require('express');
const router = express.Router();

const resultValidator = require('../midelware/resultValidator');
const {
    createSubjectValidator,
    updateSubjectValidator,
    deleteSubjectValidator,
} = require('../midelware/subject/subjectValidator');

const subjectController = require('../controllers/SubjectCintroller');
const {isAdmin,isStudent,canUpdateData} = require('../midelware/authorized');


router.route("/subjects")
    .get(subjectController.getAllSubjects)
    .post(isAdmin,createSubjectValidator,resultValidator,subjectController.createSubject)

router.route("/subjects/:id")
    .get(subjectController.getSubject)
    .put(isAdmin,updateSubjectValidator,resultValidator,subjectController.updateSubject)
    .delete(isAdmin,deleteSubjectValidator,resultValidator,subjectController.deleteSubject);

module.exports = router;
