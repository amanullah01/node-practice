const Uesr = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login Page",
    path: "/login",
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  //   res.setHeader("Set-Cookie", "loggedIn=true");
  Uesr.findById("5daeb00226e1173728b39fe0")
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/");
  });
};
