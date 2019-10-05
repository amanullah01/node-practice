const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

//middleware function

app.use("/add-product", (req, res, next) => {
  res.send(
    "<form action='/product' method='POST'><input type='text' name='title'><button type='submit'>Add product</button></form>"
  );
});

// get,post,delete,put,patch
app.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  //response
  res.send("<h1>Hello from express</h1>");
});

app.listen(3000);
