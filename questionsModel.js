const mongoose = require('mongoose');

// Setup schema

const questionSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    sample_question: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

const Question = module.exports = mongoose.model('question', questionSchema);
module.exports.get = function (callback, limit) {
    console.log('in the QUESTIONS MODEL');
    Question.find(callback).limit(limit);
}