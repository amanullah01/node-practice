const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// view engine added (PUG)
app.set("view engine", "pug");
app.set("views", "views"); // from views folder find my dynamic templates

// import from routes folder
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // for static file from public folder

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  //res.status(404).send("<h1>Page not found</h1>");
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
