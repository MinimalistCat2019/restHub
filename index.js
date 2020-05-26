const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const apiRoutes = require("./api-routes");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const db = mongoose.connection;

if (!db) {
    console.log("Error connecting db");
} else {
    console.log("Db connected successfully");
}

let port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Hello World with Express and Nodemon'));

app.use('/api', apiRoutes);





app.listen(port, function () {
    console.log("Running RestHub on port" + port);
});






mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true});
// mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true});
