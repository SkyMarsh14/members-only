const passport = require("passport");
const signInController = {
  get: (req, res) => {
    res.render("index", {
      page: "sign-in",
      errors: req.session.messages,
    });
  },
  authenticate: passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/sign-in",
    failureMessage: true,
  }),
};

module.exports = signInController;
