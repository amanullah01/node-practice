const http = require("http");

const express = require("express");

const app = express();

//middleware function
app.use("/", (req, res, next) => {
  console.log("This is always run!");
  next();
});

app.use("/add-product", (req, res, next) => {
  console.log("Add product middleware!");
  res.send("<h1>Add product page</h1>");
});

app.use("/", (req, res, next) => {
  console.log("In another middleware!");
  //response
  res.send("<h1>Hello from express</h1>");
});

app.listen(3000);
