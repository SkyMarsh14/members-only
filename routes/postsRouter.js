const { Router } = require("express");
const postsRouter = Router();
const postsController = require("./../controllers/postsController");

postsRouter.get("/", postsController.get);
postsRouter.post("/", postsController.createPost);
postsRouter.post("/delete", postsController.deletePost);
module.exports = postsRouter;
