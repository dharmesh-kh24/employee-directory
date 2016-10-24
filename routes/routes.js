//This file contains all the route mappings for various routes for the application.

var express = require('express');
var employeeController = require('../controller/employeeController.js')
var router = express.Router();

router.post("/employee", employeeController.addEmployee);
router.get("/employee", employeeController.getAllEmployees);
router.put("/employee/:id", employeeController.updateEmployee);
router.delete("/employee/:id", employeeController.deleteEmployee);

module.exports = router;
