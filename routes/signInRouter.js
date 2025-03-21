const { Router } = require("express");
const signInRouter = Router();
const signInController = require("./../controllers/signInController");

signInRouter.get("/", signInController);

module.exports = signInRouter;
