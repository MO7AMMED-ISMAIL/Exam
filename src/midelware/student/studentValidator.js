const {body , param} = require("express-validator");


exports.insertValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("must be a valid email"),
    body("password").notEmpty().withMessage("Password is required").isLength({min:6}).withMessage("must be at least 6 chars long"),
    body("age").notEmpty().withMessage("Age is required").isNumeric().withMessage("must be a valid number"),
];


exports.updateValidator = [
    body("id").notEmpty().withMessage("Id is required"),
    body("name").notEmpty().withMessage("Name is required").optional(),
    body("email").notEmpty().withMessage("Email is required").optional().isEmail().withMessage("must be a valid email").optional(),
    body("password").notEmpty().withMessage("Password is required").optional().isLength({min:6}).withMessage("must be at least 6 chars long").optional(),
    body("age").notEmpty().withMessage("Age is required").optional().isNumeric().withMessage("must be a valid number").optional(),
];


exports.deleteValidator = [
    param("id").notEmpty().withMessage("Id is required"),
]

exports.getValidator = [
    param("id").notEmpty().withMessage("Id is required"),
];
