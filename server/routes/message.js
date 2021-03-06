const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const { sendMessage } = require("../controllers/message");

router.route("/").post(sendMessage);

module.exports = router;
