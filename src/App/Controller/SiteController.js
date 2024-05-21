const Product = require("../Model/ProductModel");
const mongoose = require("mongoose");
class SiteController {
  // [GET] http:localhost:5000/
  index(req, res, next) {
    Product.find({})
      .then((products) => {
        res.status(200).json({
          products,
          // isadmin: req.user.isAdmin,
          cartlist: req.user.cartlist,
          email: req.user.email,
          username: req.user.fullname,
          id: req.user._id,
          historycheckout: req.user.historycheckout,
        });
      })
      .catch(next);
  }
}

module.exports = new SiteController();
