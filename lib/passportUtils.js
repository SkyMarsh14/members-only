const queries = require("./../db/queries");
const bcrypt = require("bcryptjs");
const registerUser = async (req, res, next) => {
  try {
    const { username, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await queries.addUser(username, firstName, lastName, hashedPassword);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const comparePassword = async (password, user) => {
  return await bcrypt.compare(password, user.password);
};

module.exports = {
  registerUser,
  comparePassword,
};
