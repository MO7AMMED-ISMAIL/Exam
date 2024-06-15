const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const degreeSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    exam: {
        type: Schema.Types.ObjectId,
        ref: 'Exam'
    },
    degree: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Degree', degreeSchema);