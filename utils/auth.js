const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  console.log("loggedin? "+ req.session.logged_in)
  if (req.session.logged_in) {
    next();
    console.log("logged in" + req.session.logged_in);
  } else {
    console.log("not logged in" + req.session.logged_in);
    res.redirect("/login");
  }
};

module.exports = withAuth;
