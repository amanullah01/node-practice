const http = require("http");

const express = require("express");

const app = express();

//middleware function
app.use((req, res, next) => {
  console.log("In middleware!");
  //allows the request to continue to the next middleware in line
  next();
});

app.use((req, res, next) => {
  console.log("In another middleware!");
  //response
  res.send("<h1>Hello from express</h1>");
});

app.listen(3000);
