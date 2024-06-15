// models/student.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Student schema
const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    age: {
        type: Number,
        min: 0
    },
    role:{
        type: String,
        default: 'student'
    }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;