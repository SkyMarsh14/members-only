const { body, validationResult } = require("express-validator");
const { registerUser } = require("./../lib/passportUtils");
const signUpController = {
  get: async (req, res) => {
    res.render("index", { page: "sign-up" });
  },
  createUser: async (req, res, next) => {
    registerUser(req, res, next);
  },
};

module.exports = signUpController;
