const { Router } = require("express");
const postsRouter = Router();
const postsController = require("./../controllers/postsController");
const { isAdmin } = require("./../lib/passportUtils");
postsRouter.get("/", postsController.get);
postsRouter.post("/", postsController.createPost);
postsRouter.post("/delete", isAdmin, postsController.deletePost);
module.exports = postsRouter;
