const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");

const {
  addToCart,
  getProdcutsFromCart,
  updateProductFromCart,
  deleteProductFromCart,
  clearCart,
  getLengthFromCart,
  getTotalFromCart,
} = require("../controllers/cartControllers");

router.use(verifyJWT);
router.route("/").get(getProdcutsFromCart);
router.route("/length").get(getLengthFromCart);
router.route("/total").get(getTotalFromCart);
router.route("/add").post(addToCart);
router.route("/delete/:id").delete(deleteProductFromCart);
router.route("/clear").delete(clearCart);
router.route("/update/:id").put(updateProductFromCart);

module.exports = router;
