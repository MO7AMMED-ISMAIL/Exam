const express = require('express');
const router = express.Router();
const resultValdation = require("../midelware/resultValidator");
const degreeController = require('../controllers/DegreeController');
const {
    createDegreeValidator,
    studentIdValidator
}=require('../midelware/degree/degreeValidator');


const {isAdmin,All,} = require("../midelware/authorized");

router.get('/degrees',isAdmin,degreeController.getAllDegrees);

router.post('/degrees',All,createDegreeValidator,resultValdation,degreeController.createDegree);

router.get('/degrees/student/:id',All,studentIdValidator,resultValdation,degreeController.getDegreesByStudentId);


module.exports = router;