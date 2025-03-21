const { Router } = require("express");
const signUpRouter = Router();
const signUpController = require("../controllers/signUpController");
signUpRouter.get("/", signUpController.get);
signUpRouter.post("/", signUpController.createUser);

module.exports = signUpRouter;
