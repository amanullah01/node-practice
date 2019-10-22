exports.getLogin = (req, res, next) => {
  console.log(req.get("Cookie"));
  //   const isLoggedIn =
  //     req
  //       .get("Cookie")
  //       .split(";")[1]
  //       .trim()
  //       .split("=")[1] === "true";

  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    pageTitle: "Login Page",
    path: "/login",
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  //   res.setHeader("Set-Cookie", "loggedIn=true");
  req.session.isLoggedIn = true;
  res.redirect("/");
};
