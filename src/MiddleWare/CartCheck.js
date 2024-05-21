const UserShema = require("../App/Model/UserModel");
const mongoose = require("mongoose");

const cartListMiddleWare = {
  checkMultiple(req, res, next) {
    // console.log(req.body);
    UserShema.findOne({ _id: req.body.userID }).then((data) => {
      // console.log("data", data);
      const list = data.cartlist;
      //   console.log("list", list);
      const isMultiple = list.some((item, index) => {
        return item.id === req.body._id;
      });
      // console.log("isMultiple", isMultiple);
      req.isMultiple = isMultiple;
      next();
    });
    //   .catch(next);
  },
};
module.exports = cartListMiddleWare;
