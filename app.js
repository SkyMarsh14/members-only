require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
const passport = require("passport");
const session = require("express-session");
const indexRouter = require("./routes/indexRouter");
const signUpRouter = require("./routes/signUpRouter");
const signInRouter = require("./routes/signInRouter");
const logoutRouter = require("./routes/logoutRouter");
const pool = require("./db/pool");
const membershipRouter = require("./routes/membershipRouter");
const unauthorizedRouter = require("./routes/unauthorizedRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetPath = path.join(__dirname, "public");
app.use(express.static(assetPath));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: new (require("connect-pg-simple")(session))({
      pool: pool,
      createTableIfMissing: true,
      tableName: "session",
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 24 * 1000 },
  })
);
require("./config/passport");
app.use(passport.session());
app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);
app.use("/sign-in", signInRouter);
app.use("/logout", logoutRouter);
app.use("/membership", membershipRouter);
app.use("/unauthorized", unauthorizedRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express app is listening to PORT ${PORT}.`);
});
