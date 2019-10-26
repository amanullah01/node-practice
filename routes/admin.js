const path = require("path");
const express = require("express");
const { check, body } = require("express-validator/check");

// const rootDir = require("../util/path");
const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title", "Title must be alphanumaric and at least 3 character")
      .isLength({ min: 3, max: 20 })
      .isString()
      .trim(),
    body("imageUrl", "Must be an URL").isURL(),
    body("price", "Price must be float").isFloat(),
    body(
      "description",
      "Description should be at least 5 character and maximum 200 character"
    )
      .isLength({ min: 5, max: 200 })
      .trim()
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);
router.post(
  "/edit-product",
  [
    body("title", "Title must be alphanumaric and at least 3 character")
      .isLength({ min: 3, max: 20 })
      .isString()
      .trim(),
    body("imageUrl", "Must be an URL")
      .isURL()
      .trim(),
    body("price", "Price must be float").isFloat(),
    body(
      "description",
      "Description should be at least 5 character and maximum 200 character"
    )
      .isLength({ min: 5, max: 200 })
      .trim()
  ],
  isAuth,
  adminController.postEditProduct
);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
