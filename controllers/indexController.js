const controller = (req, res) => {
  res.render("index", { page: "home" });
};

module.exports = controller;
