const express = require("express");
const router = express.Router();

// Controller Functions //
const methods = require("../controllers/teacher");

// Register Student
router.post("/register-student", methods.registerStudent);

// Register Teacher
router.post("/register-teacher", methods.registerTeacher);

module.exports = router;
