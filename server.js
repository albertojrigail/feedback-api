// server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
const port = 80;



app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, database) => {
    if (err) return console.log(err);
    var database = database.db('feedback-api')
    require('./app/routes')(app, database);
    app.listen(port, () => {
        console.log('We are live on ' + port);});
});