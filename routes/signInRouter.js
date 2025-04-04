const { Router } = require("express");
const signInRouter = Router();
const signInController = require("./../controllers/signInController");
signInRouter.get("/", signInController.get);
signInRouter.post("/", signInController.authenticate);

module.exports = signInRouter;
