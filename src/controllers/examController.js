const Exam = require("../models/examShema");

// Get all exams
exports.getAllExams = async (req, res, next) => {
    try {
        const exams = await Exam.find().populate('subject');
        res.status(200).json({  success: true,  data: exams });
    } catch (err) {
        next(err);
    }
}


exports.createExams= async (req , res , next)=>{
    try {
        const { examName, description, date, duration, questions , subject } = req.body;
        const newExam = new Exam({
            examName,
            description,
            date,
            duration,
            questions,
            subject
        });
        const savedExam = await newExam.save();
        res.status(201).json({ message: 'Exam created successfully', data: savedExam });
    } catch (err) {
        next(err);
    }
}

exports.getExamById = async (req, res, next) => {
    try {
        const exam = await Exam.findById(req.params.id).populate('subject');
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        return res.status(200).json({ success: true, data: exam });
    } catch (err) {
        next(err);
    }
};

exports.updateExam = async (req, res, next) => {
    try {
        const examId = req.params.id;
        const updates = req.body;

        const existingExam = await Exam.findById(examId).populate('subject');

        if (!existingExam) {
            return res.status(404).json({ success: false, message: 'Exam not found' });
        }

        Object.keys(updates).forEach((key) => {
            if (key !== 'questions') {  
                existingExam[key] = updates[key];
            }
        });

        if (updates.questions) {
            existingExam.questions = updates.questions;
        }

        const updatedExam = await existingExam.save();

        res.status(200).json({ success: true, data: updatedExam });
    } catch (err) {
        next(err);
    }
};

exports.startExam = async (req, res, next) => {
    try {
        const exam = await Exam.findById(req.params.id).populate('subject');
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        
        if (exam.questions.length >= 10) {
            return res.status(200).json({ message: 'Exam started successfully', data: exam });
        }
        res.status(400).json({ message: 'Exam must have more than 10 questions to start' });
    } catch (err) {
        next(err);
    }
};




exports.getExamsBySubjectId = async (req, res, next) => {
    try {
        const { subjectId } = req.params;

        if (!subjectId) {
            return res.status(400).json({ success: false, message: "Subject ID is required" });
        }

        const exams = await Exam.find({ subject: subjectId }).populate('subject');

        if (!exams.length) {
            return res.status(404).json({ success: false, message: "No exams found for the given subject ID" });
        }

        res.status(200).json({ success: true, data: exams });
    } catch (err) {
        next(err);
    }
};

exports.deleteExam = async (req, res, next) => {
    try {
        const deletedExam = await Exam.findByIdAndDelete(req.params.id);
        if (!deletedExam) {
            return res.status(404).json({ success: false, message: 'Exam not found' });
        }
        res.status(200).json({ success: true, message: 'Exam deleted successfully' });
    } catch (err) {
        next(err);
    }
};










