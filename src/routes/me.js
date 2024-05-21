const express = require("express");
const CartListController = require("../App/Controller/CartListController");
const cartListMiddleWare = require("../MiddleWare/CartCheck");
const router = express.Router();

router.put(
  "/addcart",
  cartListMiddleWare.checkMultiple,
  CartListController.addCartList
);
router.put("/updatecartlist", CartListController.updateCartList);
router.get("/cart", CartListController.getAllCartList);
router.put("/updatehistory", CartListController.updateHistoryCheckout);
router.post("/email", CartListController.sendEmailToClient);
router.post("/emailToAdmin", CartListController.sendEmailToAdmin);

module.exports = router;
