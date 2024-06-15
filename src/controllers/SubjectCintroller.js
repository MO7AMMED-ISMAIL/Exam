const Subject = require('../models/subjectShema');
const Exam = require('../models/examShema');

// Get all subjects
exports.getAllSubjects = async (req, res, next) => {
    try {
        const subjects = await Subject.find();
        res.status(200).json({ success: true, data: subjects });
    } catch (err) {
        next(err);
    }
};

// Get a subject by ID
exports.getSubject = async (req, res, next) => {
    const subjectId = req.params.id;
    try {
        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.status(404).json({ success: false, message: 'Subject not found' });
        }
        res.status(200).json({ success: true, data: subject });
    } catch (err) {
        next(err);
    }
};

// Create a new subject
exports.createSubject = async (req, res, next) => {
    try {
        const newSubject = new Subject(req.body);
        const savedSubject = await newSubject.save();
        res.status(201).json({ success: true, data: savedSubject });
    } catch (err) {
        next(err);
    }
};

// Update an existing subject
exports.updateSubject = async (req, res, next) => {
    const subjectId = req.params.id;
    try {
        const updatedSubject = await Subject.findByIdAndUpdate(subjectId, req.body, { new: true, runValidators: true });
        if (!updatedSubject) {
            return res.status(404).json({ success: false, message: 'Subject not found' });
        }
        res.status(200).json({ success: true, data: updatedSubject });
    } catch (err) {
        next(err);
    }
};

// Delete a subject
exports.deleteSubject = async (req, res, next) => {
    const subjectId = req.params.id;
    try {
        const deletedSubject = await Subject.findByIdAndDelete(subjectId);
        if (!deletedSubject) {
            return res.status(404).json({ success: false, message: 'Subject not found' });
        }
        res.status(200).json({ success: true, message: 'Subject deleted successfully' });
    } catch (err) {
        next(err);
    }
};
