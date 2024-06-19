const express = require("express");
const router = express.Router();

const verifyJWTtoAdmin = require("../middleware/verifyJWTtoAdmin");

const {
  uploadProduct,
  getAllProducts,
  updateProduct,
  getProduct,
  deleteProduct,
  getCategories,
  getProductsByCategory,
  searchProducts,
  filterProductController,
} = require("../controllers/productControllers");

router.route("/").get(getAllProducts);
router.route("/get/:productId").get(getProduct);
router.route("/get-categories").get(getCategories);
router.route("/get-products-category/:category").get(getProductsByCategory);
router.route("/search").get(searchProducts);
router.route("/filter-products").post(filterProductController);

router.use(verifyJWTtoAdmin);
router.route("/add").post(uploadProduct);
router.route("/update/:productId").put(updateProduct);
router.route("/delete/:productId").delete(deleteProduct);

module.exports = router;
