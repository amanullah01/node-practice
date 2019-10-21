const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

const app = express(); // this is only for handlebars. defaultLayout: null
app.set("view engine", "ejs");
app.set("views", "views"); // from views folder find my dynamic templates

//middleware
app.use((req, res, next) => {
  User.findById("5dad7b210c144e1a5492922d")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});
// import from routes folder
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // for static file from public folder

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(client => {
  app.listen(3000);
});
