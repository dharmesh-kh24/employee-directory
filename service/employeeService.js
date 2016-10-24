/*This is the service layer for employee. This file contains all the methods
which invoke the DAO layer methods for employee.*/

var chalk = require('chalk');
var employeeModel = require('../model/employeeModel');

/**
 * function to add employee
 */
function addEmployee(newEmployee) {

    return new Promise(function(resolve, reject) {
        employeeModel.addEmployee(newEmployee).then(function(message) {
            console.log(chalk.green(message));
            resolve(message);
        }).catch(function(err) {
            console.log(chalk.red("Error in adding employee: " + err));
            reject(err);
        });
    });
}

/**
 * function to get all the employees
 */
function getAllEmployees() {
    return new Promise(function(resolve, reject) {
        employeeModel.getAllEmployees().then(function(employees) {
            console.log(chalk.green("All employees list received"));
            resolve(employees);
        }).catch(function(err) {
            console.log(chalk.red("Error in getting all employees: " + err));
            reject(err);
        });
    });
}

/**
 * function to delete an employee by id
 */
function deleteEmployee(id) {
    return new Promise(function(resolve, reject) {
        employeeModel.deleteEmployee(id).then(function(resultMessage) {
            console.log(chalk.green("Employee deleted successfully"));
            resolve(resultMessage);
        }).catch(function(err) {
            console.log(chalk.red("Error in deleting employee: " + err));
            reject(err);
        });
    });
}

/**
 * function to update an employee
 */
function updateEmployee(id, employee) {
    return new Promise(function(resolve, reject) {
        employeeModel.updateEmployee(id, employee).then(function(updateEmployee) {
            console.log(chalk.green("Employee updated successfully"));
            resolve(updateEmployee);
        }).catch(function(err) {
            console.log(chalk.red("Error in updating employee: " + err));
            reject(err);
        });
    });
}

var employeeService = {
    addEmployee: addEmployee,
    getAllEmployees: getAllEmployees,
    deleteEmployee: deleteEmployee,
    updateEmployee: updateEmployee
};

module.exports = employeeService;
