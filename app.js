const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars"); // this is for handlebars template

const app = express();

app.engine(
  "hbs",
  exphbs({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: ".hbs"
  })
); // this is only for handlebars. defaultLayout: null
// app.engine(".hbs", expressHbs({ extname: ".hbs" }));
// view engine added (PUG)
//app.set("view engine", "pug");

// view engine added (handlebars)
app.set("view engine", "hbs");
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
  //res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res.status(404).render("404", { pageTitle: "404" });
});

app.listen(3000);
