#! /usr/bin/env node

console.log('This script populates some test tips and questions to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Tip = require('./tipsModel')
var Question = require('./questionsModel')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var tips = []
var questions = []

function tipCreate(author, advice, cb) {
  tipdetail = {author:author , advice: advice }
  
  var tip = new Tip(tipdetail);
       
  tip.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Tip: ' + tip);
    tips.push(tip)
    cb(null, tip)
  }  );
}

function questionCreate(author, sample_question, cb) {
    questiondetail = {author:author , sample_question: sample_question}
    
    var question = new Question(questiondetail);
         
    question.save(function (err) {
      if (err) {
        cb(err, null)
        return
      }
      console.log('New Question: ' + question);
      questions.push(question)
      cb(null, question)
    }  );
  }


function createTips(cb) {
    async.parallel([
        function(callback) {
          tipCreate('Rory Wilson', 'Find a quiet place, where you no one will disturb you.', callback);
        },
        function(callback) {
            tipCreate('Toby Hawkins', 'Have a pen and paper handy, along with a copy of your CV', callback);
          },
        function(callback) {
            tipCreate('Test Author', 'This is a test tip!', callback)
        }
        ],
        // optional callback
        cb);
}

function createQuestions(cb) {
    async.parallel([
        function(callback) {
          questionCreate('Toby Hawkins', 'Why do you want to work for us?', callback);
        },
        function(callback) {
            questionCreate('Rory Wilson', 'What are your 3 biggest strengths?', callback);
          },
        function(callback) {
            questionCreate('Test User', 'This is a test question.', callback)
        }
        ],
        // optional callback
        cb);
}




async.series([
    createTips,
    createQuestions
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('All done' + results );
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});