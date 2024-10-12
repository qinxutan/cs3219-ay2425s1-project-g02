const { test } = require("../controllers/testController");
const express = require("express");

const router = express.Router();

// Route to test connection to frontend
router.get("/test", test);

module.exports = router;
