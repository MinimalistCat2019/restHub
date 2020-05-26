const mongoose = require('mongoose');

// Setup schema

const tipSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    advice: {
        type: String, 
        required: true
    }, 
    create_date: {
        type: Date,
        default: Date.now
    }
});

const Tip = module.exports = mongoose.model('tip', tipSchema);
module.exports.get = function (callback, limit) {
    console.log('in the TIPS MODEL');
    Tip.find(callback).limit(limit);
}