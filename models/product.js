const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model("Product", productSchema);

/*
const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = parseFloat(price);
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectID(id) : null;
    this.userId = userId;
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
        // console.log(result);
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
        // console.log(products);
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
*/
