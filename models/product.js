const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = new mongodb.ObjectID(id);
  }

  // save data
  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      //update
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      //insert
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
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

  //fetch single product
  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectID(prodId) })
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => console.log(err));
  }

  //delete
  static deleteById(prodId) {
    const db = getDb();

    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectID(prodId) })
      .then(result => {
        console.log("Deleted");
      })
      .catch(err => console.log(err));
  }
}

module.exports = Product;
