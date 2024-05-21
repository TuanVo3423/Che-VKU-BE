const express = require("express");

const CommentController = require("../App/Controller/CommentController");
const router = express.Router();

router.get("/", CommentController.fetchComments);
router.post("/:id", CommentController.addComments);

module.exports = router;
