const router = require("express").Router();
const votesModel = require("./votes-model");
const votesMd = require("./votes-middleware");

router.get("/", async (req, res, next) => {
  try {
    const votes = await votesModel.getAll();
    res.status(200).json(votes);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", votesMd.voteExists, async (req, res, next) => {
  try {
    const vote = await votesModel.getById(req.params.id);
    res.status(200).json(vote);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const vote = await votesModel.add(req.body);
    res.status(201).json(vote);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", votesMd.voteExists, async (req, res, next) => {
  try {
    const deletedVote = await votesModel.remove(req.params.id);
    res.status(201).json(deletedVote);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
