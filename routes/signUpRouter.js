const { Router } = require("express");
const signUpRouter = Router();
const signUpController = require("./../controllers/signUPController");
signUpRouter.get("/", signUpController);

module.exports = signUpRouter;
