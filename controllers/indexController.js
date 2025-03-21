const controller = (req, res) => {
  res.render("index", { page: "home", user: req.user });
};

module.exports = controller;
