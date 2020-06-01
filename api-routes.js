const router = require('express').Router();

router.get('/', function (req,res) {
    res.json({
        status: 'API Is Working',
        message: 'Welcome to the api for Video Interview Tips!'
    });
});

const tipController = require('./tipsController');
const questionController = require('./questionsController');

router.route('/tips')
    .get(tipController.index)
    .post(tipController.new);

router.route('/questions')               
    .get(questionController.index)
    .post(questionController.new);

router.route('/tips/:tip_id')
    .get(tipController.view)
    .patch(tipController.update)
    .put(tipController.update)
    .delete(tipController.delete);


router.route('/questions/:question_id')
    .get(questionController.view)
    .patch(questionController.update)
    .put(questionController.update)
    .delete(questionController.delete);

module.exports = router;