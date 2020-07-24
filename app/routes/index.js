// routes/index.js
const feedbackRoutes = require('./feedback_routes');
const problemRoutes = require('./solution_routes');
module.exports = function(app, db) {
    feedbackRoutes(app, db);
    problemRoutes(app, db);
}