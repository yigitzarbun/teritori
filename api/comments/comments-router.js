const router = require("express").Router();
const commentsModel = require("./comments-model");

router.get("/", async (req, res, next) => {
  try {
    const result = await commentsModel.getAll();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await commentsModel.getById({ id });
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const post = await commentsModel.add(req.body);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
