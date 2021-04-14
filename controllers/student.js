const Joi = require("joi");
const Student = require("../models/Student");

const methods = {
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

  // ---- Edit single student details against student ID ---- //

  async editStudent(req, res, next) {
    try {
      // ---- Validation for req.body ---- //
      const studentId = req.params.id;
      const biological_details_Schema = Joi.object().keys({
        name: Joi.string().required(),
        gender: Joi.string().required(),
        surname: Joi.string().required(),
        dob: Joi.date().required(),
      });

      const contact_details_Schema = Joi.object().keys({
        physical_address: Joi.object().keys({
          street: Joi.string().required(),
          village: Joi.string().required(),
        }),
        postal_address: Joi.object().keys({
          po_box: Joi.string().required(),
          village: Joi.string().required(),
        }),
      });

      const parent_details_Schema = Joi.object().keys({
        name: Joi.string().required(),
        relationship: Joi.string().required(),
        surname: Joi.string().required(),
        dob: Joi.date().required(),
        physical_address: Joi.object().keys({
          street: Joi.string().required(),
          village: Joi.string().required(),
        }),
        postal_address: Joi.object().keys({
          po_box: Joi.string().required(),
          village: Joi.string().required(),
        }),
      });

      const phone_details_Schema = Joi.object().keys({
        telephone_home: Joi.string().required(),
        telephone_work: Joi.string().required(),
        mobile: Joi.string().required(),
        email: Joi.string().required(),
      });

      const academic_enrollment_Schema = Joi.object().keys({
        class: Joi.string().required(),
        class_teacher: Joi.string().required(),
        student_number: Joi.string().required(),
        no_of_subjects: Joi.number().required(),
      });

      const schema = Joi.object().keys({
        biological_details: biological_details_Schema,
        contact_details: contact_details_Schema,
        parent_details: parent_details_Schema,
        phone_details: phone_details_Schema,
        academic_enrollment: academic_enrollment_Schema,
      });

      // Storing Error Responses in Result //
      const results = schema.validate(req.body);
      if (results.error) {
        return res.status(400).send(results.error.details[0].message);
      }

      let {
        biological_details,
        contact_details,
        parent_details,
        phone_details,
        academic_enrollment,
      } = req.body;

      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        {
          biological_details: biological_details,
          contact_details: contact_details,
          parent_details: parent_details,
          phone_details: phone_details,
          academic_enrollment: academic_enrollment,
        },
        {
          new: true,
        }
      );
      res.status(200).json({ Student: updatedStudent });
    } catch (err) {
      next(err);
    }
  },
};
module.exports = methods;
