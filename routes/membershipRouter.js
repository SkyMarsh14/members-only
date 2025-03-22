const { Router } = require("express");
const membershipController = require("../controllers/membershipController");
const membershipRouter = Router();
const { isAuth } = require("./../lib/passportUtils");

membershipRouter.get("/", isAuth, membershipController.get);
membershipRouter.post("/", isAuth, membershipController.post);

module.exports = membershipRouter;
