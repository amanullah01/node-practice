const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const adminData = require("./admin"); // import admin data

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));

  const products = adminData.products;
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productsCSS: true
  }); //load pug file
});

module.exports = router;
