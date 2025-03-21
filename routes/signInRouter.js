const { Router } = require("express");
const signInRouter = Router();
const signInController = require("./../controllers/signInController");
const passport = require("passport");
signInRouter.get("/", signInController.get);
signInRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/sign-up",
  })
);

module.exports = signInRouter;
