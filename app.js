const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");

const errorController = require("./controllers/error");
const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://aman:aman2626@cluster-node-practice-nqjyv.mongodb.net/shop?retryWrites=true&w=majority";

const app = express(); // this is only for handlebars. defaultLayout: null
const store = new MongoDbStore({
  uri: MONGODB_URI,
  collection: "sessions"
});

const csrfProtection = csrf();

app.set("view engine", "ejs");
app.set("views", "views"); // from views folder find my dynamic templates

// import from routes folder
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // for static file from public folder

//middleware
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(csrfProtection);

app.use((req, res, next) => {
  console.log("checking...");
  if (!req.session.user) {
    console.log("not block...");
    return next();
  }
  console.log("out of not....");
  User.findById(req.session.user._id)
    .then(user => {
      console.log("In user find by id....");
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
  console.log("out of user find by id....");
});

//csrf and login session check
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    console.log("mongoose connected!!!!");
    app.listen(3000);
  })
  .catch(err => console.log(err));
