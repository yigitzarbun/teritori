const commentsModel = require("./comments-model");

const bodyExists = (req, res, next) => {
  const { body, district } = req.body;
  if (!body || !district) {
    res.status(400).json({ message: "required fields are missing" });
  } else {
    next();
  }
};

const commentIdValid = async (req, res, next) => {
  try {
    const exists = await commentsModel.getById(req.params.id);
    if (!exists) {
      res.status(400).json({ message: "comment does not exist" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { bodyExists, commentIdValid };
