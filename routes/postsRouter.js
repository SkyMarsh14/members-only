const { Router } = require("express");
const postsRouter = Router();
const postsController = require("./../controllers/postsController");

postsRouter.get("/", postsController.get);

module.exports = postsRouter;
