const ProductModel = require("../Model/ProductModel");
const PAGE_SIZE = 6;
class ProductController {
  // [POST] products/createProduct
  createProduct(req, res, next) {
    const newProduct = new ProductModel(req.body);
    // console.log("newPost : ", req.body.createdAt);
    newProduct
      .save()
      .then((product) => {
        res.status(200).json(product);
      })
      .catch(next);
  }
  // [POST] /products/:id/edit
  editProduct(req, res, next) {
    ProductModel.findOne(req.params.id)
      .then((product) => {
        res.json({ post: product });
      })
      .catch(next);
  }
  // [PUT] /products/:id
  updateProduct(req, res, next) {
    // console.log('req.body : ',req.body);
    ProductModel.updateOne({ _id: req.body.id }, req.body)
      .then(() => {
        res.status(200).json(req.body);
      })
      .catch(next);
  }
  // [DELETE] /products/:id
  deleteProduct(req, res, next) {
    ProductModel.deleteOne({ _id: req.params.id })
      .then((product) => {
        res.status(200).json(req.params.id);
      })
      .catch(next);
  }
  // [GET] products/shop
  getProductShop(req, res, next) {
    // console.log("query", req.query);
    var page = req.query.page;
    if (page) {
      page = parseInt(page);
      var skip = (page - 1) * PAGE_SIZE;

      ProductModel.find({})
        .skip(skip)
        .limit(PAGE_SIZE)
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => console.log(err));
    }
  }

  // [GET] products/shop/filter
  filterProductShop(req, res, next) {
    const field = req.query.category;
    ProductModel.find({ category: field })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(next);
  }
}
module.exports = new ProductController();
