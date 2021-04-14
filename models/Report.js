const mongoose = require("mongoose");

// Class Schema
const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    default: false,
  },
  capacity: {
    type: Number,
    default: false,
  },
  class_teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: false,
  },
  year: {
    type: Number,
    default: false,
  },
});

module.exports = mongoose.model("Class", ClassSchema);
