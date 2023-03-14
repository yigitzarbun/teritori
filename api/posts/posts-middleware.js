const postsModel = require("./posts-model");

const contentValid = (req, res, next) => {
  const { title, body, district } = req.body;
  if (!title || !body || !district || title.length > 45 || body.length > 150) {
    res.status(400).json({ message: "Required fields are empty" });
  } else {
    next();
  }
};

const postIdExists = (req, res, next) => {
  const { id } = req.params;
  const result = postsModel.getById(id);
  if (!result) {
    res
      .status(400)
      .json({ message: "there is no post matching your criteria" });
  } else {
    next();
  }
};

module.exports = { contentValid, postIdExists };
