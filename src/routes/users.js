const express = require("express");
const UsersController = require("../App/Controller/UsersController");
const router = express.Router();

router.get("/", UsersController.index);
router.delete("/:id", UsersController.deleteUser);
router.put("/:id", UsersController.updateUser);

module.exports = router;
