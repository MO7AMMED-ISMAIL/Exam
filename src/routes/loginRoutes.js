const express = require("express");
const router = express.Router();

const resultValidator = require('../midelware/resultValidator');
const {loginValidator} = require('../midelware/student/loginValidator');
const loginController = require('../controllers/auth');

router.route("/login").post(loginValidator,resultValidator,loginController.login);

module.exports = router;