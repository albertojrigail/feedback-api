// routes/problem_routes.js
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    
    // POST (pass arguments in 'body')
    app.post('/solution', (req, res) => {
        console.log('post');
        const feedback = {
            user: req.body.user,
            title: req.body.title,
            text: req.body.body,
        }
        db.collection('solution').insertOne(feedback, (err, result) => {
            if(err) {
                res.send({'Error': 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    // GET (pass id after solution: e.g. /solution/10129399)
    app.get('/solution/:id', (req, res) => {
        console.log('get');
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('solution').findOne(details, (err, item) => {
            if (err) {res.send({'Error':'An error has occurred'});}
            else {res.send(item);}
        });
    });

    // GET (gets random solution document from the database)
    app.get('/solution', (req, res) => {
        console.log('get random');
        const agg =  db.collection('solution').aggregate([{$sample: {size: 1}}], function(err, result){
            if (err) {res.send({'Error':'An error has occurred'})}
            else {
                getRandomAndSend(result, res);                        
            }
        });
    });

    async function getRandomAndSend (randomCollection, res) {
        var array =  await randomCollection.toArray();
        res.send(array[0]);
    }
}