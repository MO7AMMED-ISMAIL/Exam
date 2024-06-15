const { body, param } = require('express-validator');

exports.createSubjectValidator = [
    body('subjectName').notEmpty().withMessage('Subject name is required'),
    body('description').isString().withMessage('Description must be a string')
];

exports.updateSubjectValidator = [
    param('id').isMongoId().withMessage('Invalid subject ID'),
    body('subjectName').optional().notEmpty().withMessage('Subject name is required'),
    body('description').optional().isString().withMessage('Description must be a string')
];

exports.deleteSubjectValidator = [
    param('id').isMongoId().withMessage('Invalid subject ID')
];
