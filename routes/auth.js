const express = require("express");
const router = express.Router();

// Controller Functions //
const methods = require("../controllers/auth")

//Register USER routes
router.post("/register", methods.registerUser);

//LOGIN Route
router.post("/login", methods.login);

//LOGOUT Route
router.post("/logout", methods.logout);

module.exports = router;
