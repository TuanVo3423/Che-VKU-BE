const CommentModel = require("../Model/CommentModel");

class CommentController {
  // [GET] / comments/:id
  fetchComments(req, res, next) {
    // console.log(req.query.id);
    CommentModel.find({ productID: req.query.id }).then((comments) => {
      res.status(200).json({ comments });
    });
  }
  addComments(req, res, next) {
    // console.log(first);
  }
}
module.exports = new CommentController();
