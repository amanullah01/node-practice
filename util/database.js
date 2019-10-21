//mongo  db
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://aman:aman2626@cluster-node-practice-nqjyv.mongodb.net/test?retryWrites=true&w=majority"
  )
    .then(result => {
      console.log("connected");
      callback(result);
    })
    .catch(err => console.log(err));
};

module.exports = mongoConnect;
