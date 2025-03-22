const queries = require("./../db/queries");
const membershipController = {
  get: async (req, res) => {
    if (!req.user.hasMembership) {
      res.render("index", { page: "membership", error: req.session.message });
    } else {
      res.render("index", {
        page: "home",
        message: "You already have a membership!",
      });
    }
  },
  post: async (req, res, next) => {
    try {
      const { passphrase } = req.body;
      if (passphrase.toLowerCase() === process.env.PASSPHRASE) {
        await queries.giveMembership(req.user.id);
        res.redirect("/");
      } else {
        req.session.message = "Wrong passphrase.";
        res.redirect("/membership");
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};
module.exports = membershipController;
