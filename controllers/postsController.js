const queries = require("./../db/queries");
const postsController = {
  get: async (req, res) => {
    const posts = await queries.getPosts();
    res.render("index", { page: "posts", posts: posts.rows, user: req.user });
  },
  post: async (req, res) => {
    const { title, message } = req.body;
    const userId = req.user.id;
    await queries.createPost(title, message, userId);
    res.redirect("/posts");
  },
};

module.exports = postsController;
