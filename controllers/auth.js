const bcrypt = require("bcryptjs");

const Uesr = require("../models/user");

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  message = message.length > 0 ? (message = message[0]) : null;

  res.render("auth/login", {
    pageTitle: "Login Page",
    path: "/login",
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  message = message.length > 0 ? (message = message[0]) : null;
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  //   res.setHeader("Set-Cookie", "loggedIn=true");
  Uesr.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash("error", "Invalid email or password.");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect("/");
            });
          }
          req.flash("error", "Invalid email or password.");
          res.redirect("/login");
        })
        .catch(err => {
          console.log(err);
          req.flash("error", "Something went wrong!");
          res.redirect("/login");
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  Uesr.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash("error", "E-mail exists already, Please pick different one.");
        return res.redirect("/signup");
      }

      return bcrypt
        .hash(password, 12)
        .then(hasPassword => {
          const user = new Uesr({
            email: email,
            password: hasPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          // req.flash("error", "Invalid email or password.");
          res.redirect("/login");
        });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/");
  });
};
