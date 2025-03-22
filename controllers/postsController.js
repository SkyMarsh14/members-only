const queries = require("./../db/queries");
const postsController = {
  get: async (req, res) => {
    const posts = await queries.getPosts();
    res.render("index", { page: "posts", posts: posts.rows, user: req.user });
  },
};

module.exports = postsController;
