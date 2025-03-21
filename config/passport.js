const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const queries = require("./../db/queries");
const authUser = async (username, password, done) => {
  try {
    const authenticated_user = await queries.searchUser(username);
    if (!authenticated_user) {
      return done(null, false, { message: "Incorrect username." });
    }
    if (authenticated_user.password !== password) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, authenticated_user);
  } catch (err) {
    return done(err);
  }
};
passport.use(new LocalStrategy(authUser));
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await queries.searchUser(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
