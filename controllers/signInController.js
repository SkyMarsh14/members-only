const passport = require("passport");
const signInController = {
  get: (req, res) => {
    res.render("index", { page: "sign-in" });
  },
  post: () => {
    passport.authenticate("local", {
      failureRedirect: "/sign-up",
      successRedirect: "/",
    });
  },
};

module.exports = signInController;
