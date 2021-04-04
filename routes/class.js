const express = require("express");
const router = express.Router();

// Controller Functions //
const methods = require("../controllers/class");

// Register Student
router.post("/create-class", methods.createClass);

// ---- Get all classes against Teacher ID ---- //
router.get("/getAllClasses/:id", methods.getAllTeacherClasses);

// ---- Get all Students against class ID ---- //
router.post("/getAllStudents/:id", methods.getAllClassStudents);

module.exports = router;
