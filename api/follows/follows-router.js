const router = require("express").Router();
const followsModel = require("./follows-model");

router.get("/", async (req, res, next) => {
  try {
    const follows = await followsModel.getAll();
    res.status(200).json(follows);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const follow = await followsModel.getById(req.params.id);
    res.status(200).json(follow);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const follow = await followsModel.add(req.body);
    res.status(201).json(follow);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedFollow = await followsModel.remove(req.params.id);
    res.status(201).json(deletedFollow);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
