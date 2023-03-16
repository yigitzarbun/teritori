const votesModel = require("./votes-model");

const voteExists = async (req, res, next) => {
  try {
    const result = await votesModel.getById(req.params.id);
    if (!result) {
      res.status(400).json({ message: "vote does not exist" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const voteNotValid = async (req, res, next) => {
  try {
    const result = await votesModel.getById(req.params.id);
    if (result) {
      res.status(400).json({ message: "vote already exists" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { voteExists, voteNotValid };
