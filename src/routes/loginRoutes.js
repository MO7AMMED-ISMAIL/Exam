const express = require("express");
const router = express.Router();

const resultValidator = require('../midelware/resultValidator');
const {loginValidator} = require('../midelware/student/loginValidator');
const {createStudent} = require('../controllers/StudentContoller');
const loginController = require('../controllers/auth');
const {insertValidator} = require('../midelware/student/studentValidator');

router.route("/login").post(loginValidator,resultValidator,loginController.login);
router.route("/register").post(insertValidator ,resultValidator,createStudent);

module.exports = router;