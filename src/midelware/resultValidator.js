const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    let result = validationResult(req);

    if (result.errors.length > 0) {
        let errorMsg = result.errors.map((item)=>item.msg + ": ");
        let error = new Error(errorMsg);
        error.status = 422;
        next(error);
    }else {
        next();
    }
};