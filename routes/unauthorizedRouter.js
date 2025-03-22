const { Router } = require("express");
const unauthorizedRouter = Router();

unauthorizedRouter.use("/", (req, res) => {
  res.render("index", { page: "unauthorized" });
});
module.exports = unauthorizedRouter;
