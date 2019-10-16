// const fs = require("fs");
// const path = require("path");
const db = require("../util/database");
const Cart = require("./cart");

// const dir = require("../util/path");

// const filePath = path.join(dir, "data", "products.json");
// const getProductsFromFile = cb => {
//   fs.readFile(filePath, (err, fileContent) => {
//     if (err) {
//       return cb([]);
//     } else {
//       Object.keys(fileContent).length !== 0
//         ? cb(JSON.parse(fileContent))
//         : cb([]);
//     }
//   });
// };

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    //create product id
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute("SELECT * FROM Products");
  }

  static findById(id) {}
};
