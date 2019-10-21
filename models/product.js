const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  // save data
  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then(result => {
        console.log("on save method result!!!");
        console.log(result);
      })
      .catch(err => console.log(err));
  }

  //get all data
  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then(products => {
        console.log("get all products");
        console.log(products);
        return products;
      })
      .catch(err => console.log(err));
  }
}

module.exports = Product;
