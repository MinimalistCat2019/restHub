Question = require('./questionsModel');

exports.index = function (req, res) {
    Question.get(function (err, questions) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "questions retrieved successfully",
            data: questions
        });
    });
}

exports.new = function (req, res) {
    const question = new Question();
    question.author = req.body.author ? req.body.author : question.author;
    question.sample_question = req.body.sample_question;

    question.save(function (err) {
        if (err) {
            res.json(err);
        }
        res.json({
            message: 'New question created!',
            data: question
        });
    });
};

exports.view = function (req, res) {
    question.findById(req.params.question_id, function(err, question) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                message: 'question details loading..',
                data: question
            });
        }
    });
};

exports.update = function(req, res) {
    question.findById(req.params.question_id, function(err, question) {
        if(err) {
            res.send(err);
        }
        
        question.author = req.body.author ? req.body.author : question.author;
        question.sample_question = req.body.sample_question;
        
        question.save(function(err) {
            if (err) {
                res.json(err);
            }
            res.json({
                message: 'question updated',
                data: question
            });
        });
    });
};

exports.delete = function(req, res) {
    Question.remove({
        _id: req.params.question_id
    }, function(err, question) {
        if (err) {
            res.send(err);
        }
        res.json({
            status: "success",
            message: "question deleted"
        });
    });
};