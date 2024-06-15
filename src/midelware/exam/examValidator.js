const { body, param } = require('express-validator');

const createExamValidator = [
    body('examName').isString().withMessage('Exam name must be a string').notEmpty().withMessage('Exam name is required'),
    body('description').isString().withMessage('Description must be a string').notEmpty().withMessage('Description is required'),
    body('date').isISO8601().withMessage('Date must be a valid date').notEmpty().withMessage('Date is required'),
    body('duration').isInt({ min: 1 }).withMessage('Duration must be an integer greater than 0').notEmpty().withMessage('Duration is required'),
    body('questions').isArray({ min: 1 }).withMessage('Questions must be an array with at least one question'),
    body('questions.*.questionText').isString().withMessage('Question text must be a string').notEmpty().withMessage('Question text is required'),
    body('questions.*.options').isArray({ min: 1 }).withMessage('Options must be an array with at least one option'),
    body('questions.*.correctAnswer').isString().withMessage('Correct answer must be a string').notEmpty().withMessage('Correct answer is required'),
    body('subject').isMongoId().withMessage('subject ID must be a valid MongoDB ID'),
];

const getExamByIdValidator = [
    param('id').isMongoId().withMessage('Exam ID must be a valid MongoDB ID')
];

const getExamsBySubjectIdValidator = [
    // Validation rules for getting exams by subject ID
    param('subjectId').isMongoId().withMessage('Subject ID must be a valid MongoDB ID')
];

module.exports = {
    createExamValidator,
    getExamByIdValidator,
    getExamsBySubjectIdValidator
};


