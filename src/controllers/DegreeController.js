const Degree = require('../models/degreeShema'); 
const mongoose = require('mongoose');

// Create a new degree
exports.createDegree = async (req, res, next) => {
    try {
        const { student, exam, degree } = req.body;

        const newDegree = new Degree({
            student,
            exam,
            degree
        });

        const savedDegree = await newDegree.save();
        res.status(201).json({ message: 'Degree created successfully', data: savedDegree });
    } catch (err) {
        next(err);
    }
};

// Get all degrees with populated references
exports.getAllDegrees = async (req, res, next) => {
    try {
        const degrees = await Degree.find()
            .populate('student', 'name')
            .populate('exam', 'examName');
        res.status(200).json({ data: degrees });
    } catch (err) {
        next(err);
    }
};

// Get degrees for a specific student with populated references
exports.getDegreesByStudentId = async (req, res, next) => {
    try {
        const studentId = req.params.id;
        const degrees = await Degree.find({ student: studentId })
            .populate('student', 'name')
            .populate('exam', 'examName');
        if (degrees.length === 0) {
            return res.status(404).json({ message: 'No degrees found for this student' });
        }
        res.status(200).json({ data: degrees });
    } catch (err) {
        next(err);
    }
};


exports.hasDegreeForExam = async (req, res, next) => {
    try {
        const { studentId, examId } = req.params;

    
        if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(examId)) {
            return res.status(400).json({ message: 'Invalid studentId or examId' });
        }

        const degree = await Degree.findOne({ student: studentId, exam: examId });


        if (!degree) {
            return res.json({ hasDegree: false });
        }

        return res.json({ hasDegree: true });
    } catch (err) {
        next(err);
    }
};