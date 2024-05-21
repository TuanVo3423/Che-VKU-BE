const express = require("express");
const productController = require("../App/Controller/ProductController");
const router = express.Router();

router.post("/createProduct", productController.createProduct);
router.get("/shop", productController.getProductShop);
router.get("/shop/filter", productController.filterProductShop);
router.get("/:id/edit", productController.editProduct);
router.delete("/:id", productController.deleteProduct);
router.put("/:id", productController.updateProduct);

module.exports = router;
