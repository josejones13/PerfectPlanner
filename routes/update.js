const express = require("express");
const router = express.Router();
const { update } = require("../controllers/updateController");
const { ensureAuthenticated } = require("../middleware/authMiddleware");

router.post("/", ensureAuthenticated, update);
module.exports = router;
