/*This is the entrypoint of the application. This file contains all the
configurations of the application.*/

var express = require('express');
var path = require('path');
var chalk = require('chalk');
var bodyParser = require('body-parser');
var db = require("./model/db");
var routes = require('./routes/routes');
var corsFilter = require('./filters/cors.filter.js');
var app = express();
var router = express.Router();

//applying badyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//serving static content in public folder
app.use('/', express.static(path.join(__dirname, 'public')));

//applying CORS Filter for Cross Origin suppport
corsFilter(app);

//configuring the routes for the apis
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log(chalk.red("Error handler for page not found called "));
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(chalk.red("Error handler for server called " + JSON.stringify(error)));
        res.status(err.status || 500).json(err);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log(chalk.red("Error handler for server called " + JSON.stringify(err)));
    res.status(err.status || 500).json(err);
});

//configuring port
var port = process.env.PORT || 8080;

//starting the server
var server = app.listen(port, function(err) {
    if (err) {
        console.error(JSON.stringify(err));
    } else {
        console.log(chalk.blue("Server running on port:" + port));
        console.log(chalk.blue("Connecting to database..."));
        db.connect();
    }
});

module.exports = app;
