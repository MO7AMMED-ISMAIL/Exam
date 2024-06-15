const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Subject Schema
const subjectSchema = new Schema({
    subjectName: { type: String, required: true },
    description: { type: String },
});

// Create the Subject Model
const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
