const bcrypt = require('bcrypt');
const Student = require("../models/studentShema");
const cloudinary = require("../../config/cloundinary");


exports.getAllStudents = async (req, res,next) => {
    // get All students
    try {
        const students = await Student.find();
        res.status(200).json({
            success: true,
            status: 200,
            data: students
        });
    }catch (err) {
        next(err);
    }
}

exports.getStudent = async (req, res,next) => {
    // get student by id
    const studentId = req.params.id;
    try {
        const student = await Student.findById(studentId);
        if(!student){
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Student not found"
            });
        }
        res.status(200).json({
            success: true,
            status: 200,
            data: student
        });
    }catch (err) {
        next(err);
    }
}

exports.createStudent = async (req, res,next) => {
    try{
        if(!req.file){
            return next(new Error("Please upload a file",400));
        }
        const {name , email , password , age} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
        const student = new Student({
            name,
            email,
            password: hashedPassword,
            age,
            image:cloudinaryResponse.secure_url
        });
        const data = await student.save();
        res.status(200).json({
            success: true,
            status: 200,
            data: data
        });
    }catch (err) {
        next(err);
    }
}

//update Student
exports.updateStudent = async (req, res,next) => {
    // update student by id
    console.log("update");
    try {
        const studentId = req.body.id;
        const updateFields = {};
        if(req.body.name){updateFields.name = req.body.name;}
        if(req.body.email){updateFields.email = req.body.email;}
        if(req.body.age){updateFields.age = req.body.age;}
        if(req.body.password){
            let hashedPassword = await bcrypt.hash(req.body.password, 10);
            updateFields.password = hashedPassword;
        }
        if(req.file){
            const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
            updateFields.image = cloudinaryResponse.secure_url;
        }
        const student = await Student.findByIdAndUpdate(studentId,updateFields,{new:true});
        if(!student){
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Student not found"
            });
        }
        res.status(200).json({
            success: true,
            status: 200,
            data: student
        });
    }catch (err) {
        next(err);
    }
}


//delete Student
exports.deleteStudent = async (req, res,next) => {
    const studentId = req.params.id;
    try {
        const student = await Student.findByIdAndDelete(studentId);
        if(!student){
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Student not found"
            });
        }
        res.status(200).json({
            success: true,
            status: 200,
            data: student
        });
    }catch (err) {
        next(err);
    }
}