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
    require('./app/routes')(app, database);
    app.listen(port, '0.0.0.0');

    app.get('/', (req, res) => {
        var uid = req.params.id;
        res.sendFile(__dirname + '/pages/homepage.html');
    });
    console.log('We are live on ' + port);
});
