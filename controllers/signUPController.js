const signUpController = async (req, res) => {
  res.render("index", { page: "sign-up" });
};

module.exports = signUpController;
