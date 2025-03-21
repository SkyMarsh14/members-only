require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const signUpRouter = require("./routes/signUpRouter");
const signInRouter = require("./routes/signInRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetPath = path.join(__dirname, "public");
app.use(express.static(assetPath));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);
app.use("/sign-in", signInRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express app is listening to PORT ${PORT}.`);
});
