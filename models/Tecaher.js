const mongoose = require("mongoose");

// Teacher Schema
const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    default: false,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: false,
    default: false,
  },
});

module.exports = mongoose.model("Teacher", TeacherSchema);
