const { body, param } = require('express-validator');


const createDegreeValidator = [
    body('student').isMongoId().withMessage('Student ID must be a valid MongoDB ID'),
    body('exam').isMongoId().withMessage('Exam ID must be a valid MongoDB ID'),
    body('degree').isInt({ min: 0 ,max: 100}).withMessage('Degree must be a non-negative integer and between 0: 100'),
];

const studentIdValidator = [
    param('id').isMongoId().withMessage('Student ID must be a valid MongoDB ID')
];


module.exports = {
    createDegreeValidator,
    studentIdValidator
}