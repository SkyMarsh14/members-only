const queries = require("./../db/queries");
const bcrypt = require("bcryptjs");
const registerUser = async (req, res, next) => {
  try {
    const { username, password, firstName, lastName, isAdmin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await queries.addUser(
      username,
      firstName,
      lastName,
      hashedPassword,
      isAdmin
    );
    res.redirect("/sign-in");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const comparePassword = async (password, user) => {
  return await bcrypt.compare(password, user.password);
};
const isAuth = async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).redirect("/unauthorized");
  }
};

module.exports = {
  registerUser,
  comparePassword,
  isAuth,
};
