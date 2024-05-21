const User = require("../Model/UserModel");
const mongoose = require("mongoose");
class UsersController {
  // [GET] http:localhost:5000/users
  index(req, res, next) {
    User.find({})
      .then((users) => {
        res.status(200).json({ users });
      })
      .catch(next);
  }
  // [PUT] http:localhost:5000/users/:id
  updateUser(req, res, next) {
    User.updateOne({ _id: req.body.id }, req.body)
      .then(() => {
        res.status(200).json(req.body);
      })
      .catch(next);
  }
  // [DELETE] http:localhost:5000/users/:id
  deleteUser(req, res, next) {
    User.deleteOne({ _id: req.params.id })
      .then((user) => {
        res.status(200).json({
          msg: "User deleted successfully",
        });
      })
      .catch(next);
  }
}

module.exports = new UsersController();
