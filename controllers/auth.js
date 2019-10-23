require("dotenv").config();

const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const Uesr = require("../models/user");

//smtp gmail
let transportGmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

//sendgrid
/*
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key:process.env.API_KEY
    }
  })
);
*/

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
          let url = req.headers.host + "/login";
          res.redirect("/login");
          return transportGmail
            .sendMail({
              to: email,
              from: "aman@softograph.com",
              subject: "Shop signup html page",
              html:
                "<p>Thank you for sign up at our system. You can shop now. You can login now from here.<a href='" +
                url +
                "'>Login</a></p>"
            })
            .catch(err => {
              console.log("email error", err);
            });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/");
  });
};
