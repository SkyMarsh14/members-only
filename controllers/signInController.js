const signInController = (req, res) => {
  res.render("index", { page: "sign-in" });
};

module.exports = signInController;
