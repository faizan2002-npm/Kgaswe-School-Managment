const mongoose = require("mongoose");

// Class Schema
const ClassSchema = new mongoose.Schema({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: false,
  },
  month: [
    {
      name: String,
      studentMarks: [
        {
          name: String,
          marks: Number,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Class", ClassSchema);
