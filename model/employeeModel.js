//This is the DAO layer for employee. This file contains all the CRUD operations for employee.

var Promise = require("bluebird");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//defining the employee schema
var employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

//Associating the employee schema
var Employee = mongoose.model('employee', employeeSchema);

//setting the updated_at field using pre-save hook
employeeSchema.pre('save', function(next) {
    var employee = this;
    employee.updated_at = Date.now();
    next();
})

/**
 * function to add the employee to database
 * if an employee is already present with the same email address, he will not be added to the database
 * if email is not present in database, then add the employee to database
 */
function addEmployee(employee) {
    return new Promise(function(resolve, reject) {

        //finding employee by email
        Employee.findOne({
            email: employee.email
        }, function(err, emp) {
            if (emp != null) {
                var message = "Employee with this email id already exists!";
                resolve(message);
            } else {
                //adding employee to database
                Employee.create(employee, function(err, emp) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(emp);
                    }
                });
            }
        });
    });
}

/**
 * function to get all the employees from the database
 */
function getAllEmployees() {
    return new Promise(function(resolve, reject) {
        Employee.find({}, function(err, employees) {
            if (!err) {
                resolve(employees);
            } else {
                reject(err);
            }
        })
    })
}

/**
 * function to delete an employee from the database
 * First find if an employee exists with the given id.
 * If present , then delete it
 * If not present , then send back an error
 */
function deleteEmployee(id) {
    return new Promise(function(resolve, reject) {

        //finding the employee by _id
        Employee.findOne({
            _id: id
        }, function(err, emp) {
            if (!err && emp != null) {

                //removing the found employee
                emp.remove(function(err, data) {
                    if (!err) {
                        resolve("Employee removed successfully")
                    } else {
                        reject(err);
                    }
                })
            } else {
                reject(err);
            }
        })
    })
}

/**
 * function to update the details of an employee
 */
function updateEmployee(id, employee) {
    //search query - indicates how to search the employee
    var searchQuery = {
        _id: id
    };

    //update query - indicates which all fields will be changed
    var updateQuery = {
        $set: {
            'name': employee.name,
            'email': employee.email,
            'date_of_birth': employee.date_of_birth,
            'department': employee.department,
            'gender': employee.gender,
            'age': employee.age
        }
    };
    var options = {
        new: true
    };

    return new Promise(function(resolve, reject) {
        Employee.findOneAndUpdate(searchQuery, updateQuery, options, function(err, data) {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        });
    });
}

var employeeDao = {
    addEmployee: addEmployee,
    getAllEmployees: getAllEmployees,
    deleteEmployee: deleteEmployee,
    updateEmployee: updateEmployee
}
module.exports = employeeDao;
