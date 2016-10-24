/*This file contains the function to connect to database and the configuration of
databasee,i.e the URL of the database hosted on mongolab with username and password.*/

//requiring libraries and modules
var mongoose = require("mongoose");
var chalk = require('chalk');

//database connection URL
var dbURI = 'mongodb://dharmesh:12345678@ds063946.mlab.com:63946/employee-directory';

//function to connect to MongoDB database
function connect() {

    mongoose.connect(dbURI);

    mongoose.connection.on('connected', function() {
        console.log(chalk.yellow("Connected to Database"));
    });

    mongoose.connection.on('error', function(err) {
        console.log(chalk.red("Error while connecting to database: " + JSON.stringify(err)));
    });

    mongoose.connection.on('disconnected', function() {
        console.log(chalk.yellow("Database disconnected"));
    });
}

var mongoConnect = {
    connect: connect
};

module.exports = mongoConnect;
