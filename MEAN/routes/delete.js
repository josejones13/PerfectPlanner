const express = require("express");
const router = express.Router();
const { delete: deleteRecord } = require("../controllers/deleteController");
const { ensureAuthenticated } = require("../middleware/authMiddleware");

router.post("/", ensureAuthenticated, deleteRecord);
module.exports = router;
