const router = require("express").Router();
const postsModel = require("./posts-model");
const postsMd = require("./posts-middleware");

router.get("/", async (req, res, next) => {
  try {
    const posts = await postsModel.getAll();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postsModel.getById({ id });
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

router.post("/", postsMd.contentValid, async (req, res, next) => {
  try {
    const post = await postsModel.add(req.body);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  postsMd.postIdExists,
  postsMd.contentValid,
  async (req, res, next) => {
    try {
      await postsModel.update(req.params.id, req.body);
      const updated = await postsModel.getById(req.params.id);
      res.status(201).json(updated);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", postsMd.postIdExists, async (req, res, next) => {
  try {
    const deletedPost = await postsModel.remove(req.params.id);
    res.status(201).json(deletedPost);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
