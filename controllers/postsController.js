const queries = require("./../db/queries");
const postsController = {
  get: async (req, res) => {
    const posts = await queries.getPosts();
    res.render("index", { page: "posts", posts: posts.rows, user: req.user });
  },
  createPost: async (req, res) => {
    const { title, message } = req.body;
    const userId = req.user.id;
    await queries.createPost(title, message, userId);
    res.redirect("/posts");
  },
  deletePost: async (req, res, next) => {
    const { postId } = req.body;
    try {
      await queries.deletePost(postId);
    } catch (err) {
      console.log(err);
      next(err);
    }
    res.redirect("/posts");
  },
};

module.exports = postsController;
