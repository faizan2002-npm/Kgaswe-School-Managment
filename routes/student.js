const express = require("express");
const router = express.Router();

let { validateType, protect } = require("../middleware/auth");

// Controller Functions //
const methods = require("../controllers/student");

// ---- Get Single Student against student ID ---- //
router.get("/getStudent/:id", methods.getStudent);

// ---- Edit Single Student against student ID ---- //
router.put("/editStudent/:id", methods.editStudent);

module.exports = router;
