const jwt = require("jsonwebtoken");
const User = require("../App/Model/UserModel");
const mongoose = require("mongoose");

const middlewareController = {
  // verify token
  verifyToken: (req, res, next) => {
    const accessToken = req.headers.token;
    // console.log('accessToken: ' + accessToken);
    if (!accessToken) {
      return res.status(403).json({
        message: "You have login or register account!",
        type: "info",
      });
    }
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        res.status(403).json({
          message: "Your session has expired, please login again!",
          type: "info",
        });
      } else {
        // console.log("user", user);
        User.find({
          _id: user.id,
        }).then((data) => {
          // console.log("data : ", data);
          req.user = data[0];
          next();
        });
      }
    });
  },
  checkIsAdmin: (req, res, next) => {
    // console.log("id : ", req.user._id);
    if (req.user._id) {
      const id = mongoose.Types.ObjectId(req.user._id);
      User.findOne({
        _id: id,
      })
        .then((user) => {
          if (user) {
            if (user.isAdmin === true) {
              req.isAdmin = true;
              req.id = user._id;
              next();
            } else if (user.isAdmin === false) {
              req.isAdmin = false;
              next();
            }
          } else {
            res.status(403).json({
              message: "Account has been deleted in database!!!",
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
module.exports = middlewareController;
