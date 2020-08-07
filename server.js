// server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
const port = 2999;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, database) =>{
    if (err) return console.log(err);
    var database = database.db('feedback-api')
    app.listen(port, '0.0.0.0');
    require('/routes')(app, database);
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/homepage.html');
    });
    console.log('We are live on ' + port);
});
