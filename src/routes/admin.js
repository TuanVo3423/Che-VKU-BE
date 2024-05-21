const express = require("express");
const AdminProductController = require("../App/Controller/AdminProductController");
const router = express.Router();

router.get("/", AdminProductController.index);

module.exports = router;
