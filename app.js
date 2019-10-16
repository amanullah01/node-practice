const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const app = express(); // this is only for handlebars. defaultLayout: null
app.set("view engine", "ejs");
app.set("views", "views"); // from views folder find my dynamic templates

//middleware
app.use((req, res, next) => {
  User.findByPk(1)
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

//relation/association
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

//db
//force: true delete all data
sequelize
  .sync({ force: true })
  // .sync()
  .then(result => {
    return User.findByPk(1);
    //console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: "Aman", email: "aman@softograph.com" });
    }
    return user;
  })
  .then(user => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
