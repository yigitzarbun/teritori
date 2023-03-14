const commentsModel = require("./comments-model");

const bodyExists = (req, res, next) => {
  const { body, district } = req.body;
  if (!body || !district) {
    req.status(400).json({ message: "required fields are missing" });
  } else {
    next();
  }
};

module.exports = { bodyExists };
