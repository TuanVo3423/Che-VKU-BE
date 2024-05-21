const express = require("express");

const ChatController = require("../App/Controller/ChatController");
const router = express.Router();

router.get("/", ChatController.index);

module.exports = router;
