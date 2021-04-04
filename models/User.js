const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// USERS SCHEMA
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
    select: false,
  },
  phone: {
    type: Number,
    required: false,
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  type: {
    type: String,
    enum: ["teacher", "student", "head-master", "principle"],
    required: false,
    default: "user",
  },

  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher",
    required: false,
  },

  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: false,
  },

  headMaster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HeadMaster",
    required: false,
  },

  principle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "principle",
    required: false,
  },

  notifications: [
    {
      title: String,
      description: String,
    },
  ],

  isDeleted: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  restPasswordExpires: Date,
});

//Encrypt Password
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.secretOrPrivateKey, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Check user entered password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("User", UserSchema);
