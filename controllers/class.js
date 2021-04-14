const Joi = require("joi");
const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Tecaher");
const Class = require("../models/Class");

const methods = {
  //---- Create New Class ----//

  async createClass(req, res, next) {
    try {
      const schema = Joi.object().keys({
        name: Joi.string().required(),
        capacity: Joi.string().required(),
        class_teacher: Joi.string().required(),
        year: Joi.number().required(),
      });
      // Storing Error Responses in Result //
      const results = schema.validate(req.body);
      if (results.error) {
        return res.status(400).send(results.error.details[0].message);
      }

      let { name, capacity, class_teacher, year } = req.body;

      const newClass = new Class({
        name: name,
        capacity: capacity,
        class_teacher: class_teacher,
        year: year,
      });

      await newClass.save();
      res.status(200).json({ newClass: newClass });
    } catch (err) {
      next(err);
    }
  },

  // ---- Get all classes against Teacher ID ---- //
  async getAllTeacherClasses(req, res, next) {
    try {
      const teacherId = req.user.teacher;
      const classes = await Class.find({ class_teacher: teacherId });
      if (classes.length > 0) {
        res.status(200).json({ classes: classes });
      } else {
        res
          .status(200)
          .json({ classes: "No classes found against this teacher" });
      }
    } catch (err) {
      next(err);
    }
  },

  // ---- Get all students against Class ID ---- //
  async getAllClassStudents(req, res, next) {
    try {
      const classId = req.params.id;
      const students = await Student.find({
        "academic_enrollment.class": classId,
      }).select("biological_details");
      if (students.length > 0) {
        res.status(200).json({ Students: students });
      } else {
        res
          .status(200)
          .json({ Students: "No students found against this class" });
      }
    } catch (err) {
      next(err);
    }
  },

  // ---- Get single student details against student ID ---- //
  async getStudent(req, res, next) {
    try {
      const studentId = req.params.id;
      const student = await Student.findById(studentId).select(
        "contact_details parent_details phone_details academic_enrollment createdAt biological_details"
      );
      res.status(200).json({ Student: student });
    } catch (err) {
      next(err);
    }
  },
};
module.exports = methods;
