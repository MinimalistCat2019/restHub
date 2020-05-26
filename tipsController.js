Tip = require('./tipsModel');

exports.index = function (req, res) {
    Tip.get(function (err, tips) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Tips retrieved successfully",
            data: tips
        });
    });
}

exports.new = function (req, res) {

    console.log('in the tips controller')
    const tip = new Tip();
    tip.author = req.body.author ? req.body.author : tip.author;
    tip.advice = req.body.advice;

    tip.save(function (err) {
        if (err) {
            res.json(err);
        }
        res.json({
            message: 'New tip created!',
            data: tip
        });
    });
};

exports.view = function (req, res) {
    tip.findById(req.params.tip_id, function(err, tip) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                message: 'tip details loading..',
                data: tip
            });
        }
    });
};

exports.update = function(req, res) {
    tip.findById(req.params.tip_id, function(err, tip) {
        if(err) {
            res.send(err);
        }
        
        tip.author = req.body.author ? req.body.author : tip.author;
        tip.advice = req.body.advice;
        
        tip.save(function(err) {
            if (err) {
                res.json(err);
            }
            res.json({
                message: 'Tip updated',
                data: tip
            });
        });
    });
};

exports.delete = function(req, res) {
    Tip.remove({
        _id: req.params.tip_id
    }, function(err, tip) {
        if (err) {
            res.send(err);
        }

        res.json({
            status: "success",
            message: "tip deleted"
        });
    });
};