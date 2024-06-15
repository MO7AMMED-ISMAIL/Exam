const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
        let token = req.get('authorization').split(' ')[1];
        let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.token = decodedToken;
        next();
    }catch(err){
        err.message = "not Athenticated";
        next(err);
    }
}

module.exports.isAdmin=(req, res, next)=>{
    if(req.token.role === 'admin'){
        next();
    }else{
        throw new Error('You are not authorized to access this data');
    }
}

module.exports.isStudent = (req, res, next)=>{
    if(req.token.role === 'student'){
        next();
    }else{
        throw new Error('You are not authorized to access this data');
    }
}

module.exports.All = (req, res, next)=>{
    if(req.token.role === 'student' || req.token.role === 'admin'){
        next();
    }else{
        throw new Error('You are not authorized to access this data');
    }
}

module.exports.canUpdateData = (req, res, next)=>{
    id = req.params.id || req.body.id;
    console.log(id);
    if(req.token.role === 'admin' || req.token.id === id){
        next();
    }else{
        throw new Error('You are not authorized to access this data');
    }
}




