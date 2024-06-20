const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Student = require('../models/studentShema');


exports.login = async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        const student = await Student.findOne({email});
        if(!student){
            return next(new Error('Email or password is incorrect',400));
        }
        const isMatch = await bcrypt.compare(password,student.password);
        if(!isMatch){
            return next(new Error('Email or password is incorrect',400));
        }
        if(isMatch){
            const payload = {
                id:student._id,
                email:student.email,
                name:student.name,
                image: student.image,
                role:student.role,
            }
            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {expiresIn:'10h'}
            );
            res.status(200).json({
                success:true,
                message:'Login successful',
                token,
                role:student.role,
                id: student._id
            })
        }
    }catch(error){
        next(error);
    }
}
