const router = require("express").Router();
const commentsModel = require("./comments-model");
const commentsMd = require("./comments-middleware");

router.get("/", async (req, res, next) => {
  try {
    const result = await commentsModel.getAll();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", commentsMd.commentIdValid, async (req, res, next) => {
  try {
    const comment = await commentsModel.getById(req.params.id);
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
});

router.post("/", commentsMd.bodyExists, async (req, res, next) => {
  try {
    const post = await commentsModel.add(req.body);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
