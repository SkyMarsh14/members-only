const { body, validationResult } = require("express-validator");
const queries = require("./../db/queries");
const signUpController = {
  get: async (req, res) => {
    res.render("index", { page: "sign-up" });
  },
  createUser: async (req, res) => {
    const { firstName, lastName, username, password } = req.body;
    try {
      await queries.addUser(username, firstName, lastName, password);
    } catch (err) {
      console.log(err);
    }
    res.redirect("/");
  },
};

module.exports = signUpController;
