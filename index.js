const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://PaulaFWilson:F1recracker@cluster0-ah9ei.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const apiRoutes = require("./api-routes");
// const cors = require('cors');


app.use(bodyParser.urlencoded({
    extended: true
}));

// app.use(cors)
app.use(bodyParser.json());




if (!db) {
    console.log("Error connecting db");
} else {
    console.log("Db connected successfully");
}

app.listen(process.env.PORT || 8080);

app.get('/', (req, res) => res.send('Hello World with Express and Nodemon'));

app.use('/api', apiRoutes);







