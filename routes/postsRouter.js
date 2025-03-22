const { Router } = require("express");
const postsRouter = Router();
const postsController = require("./../controllers/postsController");

postsRouter.get("/", postsController.get);
postsRouter.post("/", postsController.post);
module.exports = postsRouter;
