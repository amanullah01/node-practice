const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express(); // this is only for handlebars. defaultLayout: null
app.set("view engine", "ejs");
app.set("views", "views"); // from views folder find my dynamic templates

//middleware
app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false })
);

app.use((req, res, next) => {
  User.findById("5daeb00226e1173728b39fe0")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});
// import from routes folder
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // for static file from public folder

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://aman:aman2626@cluster-node-practice-nqjyv.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(result => {
    console.log("mongoose connected!!!!");
    User.findOne()
      .then(user => {
        if (!user) {
          const user = new User({
            name: "Amanullah Aman",
            email: "aman@softograph.com",
            cart: {
              items: []
            }
          });
          user.save();
        }
      })
      .catch(err => console.log(err));

    app.listen(3000);
  })
  .catch(err => console.log(err));
