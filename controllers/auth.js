require("dotenv").config();
const crypto = require("crypto");

const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const { validationResult } = require("express-validator/check");

const User = require("../models/user");

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
  User.findOne({ email: email })
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
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
      errorMessage: errors.array()[0].msg
    });
  }

  bcrypt
    .hash(password, 12)
    .then(hasPassword => {
      const user = new User({
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
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash("error");
  message = message.length > 0 ? (message = message[0]) : null;
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: message
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then(user => {
        console.log(user);
        if (!user) {
          req.flash("error", "No account with this email found");
          return res.redirect("/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
        res.redirect("/");
        transportGmail.sendMail({
          to: req.body.email,
          from: "aman@softograph.com",
          subject: "Password reset | Shop",
          html: `
            <p>You requested a password reset.</p>
            <p>Click this <a href="http://localhost:3000/reset/${token}">Reset Link</a></p>
          `
        });
      })
      .catch(err => console.log(err));
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;

  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() }
  })
    .then(user => {
      console.log(user);
      if (!user) {
        req.flash("error", "Reset password token has expired.");
        return res.redirect("/login");
      }
      let message = req.flash("error");
      message = message.length > 0 ? (message = message[0]) : null;
      res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "New Password",
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token
      });
    })
    .catch(err => console.log(err));
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: {
      $gt: Date.now()
    },
    _id: userId
  })
    .then(user => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then(hasPassword => {
      resetUser.password = hasPassword;
      resetUser.resetToken = null;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(result => {
      res.redirect("/login");
    })
    .catch(err => console.log(err));
};
