const fs = require("fs");
const path = require("path");

const dir = require("../util/path");

const filePath = path.join(dir, "data", "products.json");
const getProductsFromFile = cb => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      console.log("error: ", err);
      return cb([]);
    } else {
      Object.keys(fileContent).length !== 0
        ? cb(JSON.parse(fileContent))
        : cb([]);
    }
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), err => {
        console.log("save file error", err);
      });
    });
  }

  static fetchAll(cb) {
    console.log("cb: ", cb);
    getProductsFromFile(cb);
  }
};
