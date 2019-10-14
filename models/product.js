const fs = require("fs");
const path = require("path");

const dir = require("../util/path");

const filePath = path.join(dir, "data", "products.json");
const getProductsFromFile = cb => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      return cb([]);
    } else {
      Object.keys(fileContent).length !== 0
        ? cb(JSON.parse(fileContent))
        : cb([]);
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    //create product id
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), err => {
        console.log("save file error", err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
