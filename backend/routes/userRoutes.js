const express = require("express");
const router = express.Router();

const verifyJWT = require("../middleware/verifyJWT");
const verifyJWTtoAdmin = require("../middleware/verifyJWTtoAdmin");

const {
  getAllUsers,
  getUser,
  updateRole,
  getOneUser,
} = require("../controllers/userControllers");

router.use(verifyJWT);
router.route("/get-user").get(getUser);

router.use(verifyJWTtoAdmin);
router.route("/").get(getAllUsers);
router.route("/get-one-user/:userId").get(getOneUser);
router.route("/update-role/:userId").put(updateRole);

module.exports = router;
