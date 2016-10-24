/*This is the controller for employee . This file contains all the controller
methods for employee*/

var chalk = require('chalk');
var employeeService = require('../service/employeeService');

/**
 * function to add employee
 */
function addEmployee(req, res) {
    console.log(chalk.yellow("Adding employee " + req.body.name + " with email id " + req.body.email));
    employeeService.addEmployee(req.body).then(function(employees) {
        var response = {
            message: employees
        };
        res.status(201).json(employees);
    }).then(undefined, function(err) {
        res.status(500).json(err);
    })
}

/**
 * function to get all the employees
 */
function getAllEmployees(req, res) {
    console.log(chalk.yellow("Getting all employees..."));
    employeeService.getAllEmployees().then(function(employees) {
        res.status(200).json(employees);
    }).then(undefined, function(err) {
        res.status(500).json(err);
    })
}

/**
 * function to delete an employee by id
 */
function deleteEmployee(req, res) {
    console.log(chalk.yellow("Deleting employee with id " + req.params.id));
    employeeService.deleteEmployee(req.params.id).then(function(resultMessage) {
        res.status(200).json(resultMessage);
    }).then(undefined, function(err) {
        res.status(500).json(err);
    })
}

/**
 * function to update an employee
 */
function updateEmployee(req, res) {
    console.log(chalk.yellow("Updating employee " + req.body.name + " with email id " + req.body.email));
    employeeService.updateEmployee(req.params.id, req.body).then(function(employee) {
        res.status(200).json(employee);
    }).then(undefined, function(err) {
        res.status(500).json(err);
    })
}

var employeeController = {
    addEmployee: addEmployee,
    getAllEmployees: getAllEmployees,
    deleteEmployee: deleteEmployee,
    updateEmployee: updateEmployee
};

module.exports = employeeController;
