const fs = require("fs");
const path = require("path");

const dir = require("../util/path");

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    //products.push(this);
    const filePath = path.join(dir, "data", "products.json");
    fs.readFile(filePath, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    const filePath = path.join(dir, "data", "products.json");
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        cb([]);
      }
      cb(JSON.parse(fileContent));
    });
  }
};
