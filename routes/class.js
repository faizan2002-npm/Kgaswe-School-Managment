const express = require("express");
const router = express.Router();

let { validateType, protect } = require("../middleware/auth");

// Controller Functions //
const methods = require("../controllers/class");

// Register Student
router.post("/create-class", methods.createClass);

// ---- Get all classes against Teacher ID ---- //
router.get(
  "/getAllClasses",
  [protect, validateType("teacher")],
  methods.getAllTeacherClasses
);

// ---- Get all Students against class ID ---- //
router.get("/getAllStudents/:id", methods.getAllClassStudents);

// ---- Get Single Student against student ID ---- //
router.get("/getStudent/:id", methods.getStudent);

module.exports = router;
