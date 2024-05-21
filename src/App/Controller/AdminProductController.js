const Product = require("../Model/ProductModel");
const mongoose = require("mongoose");
class AdminProductController {
  // [GET] http:localhost:5000/
  index(req, res, next) {
    Product.find({})
      .then((products) => {
        res.status(200).json({
          products,
        });
      })
      .catch(next);
  }
}

module.exports = new AdminProductController();
