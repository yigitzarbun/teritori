const postsModel = require("./posts-model");

const contentValid = (req, res, next) => {
  const { title, body, district } = req.body;
  if (!title || !body || !district || title.length > 45 || body.length > 150) {
    res.status(400).json({ message: "Required fields are empty" });
  } else {
    next();
  }
};

const postIdExists = async (req, res, next) => {
  try {
    const result = await postsModel.getById(req.params.id);
    if (!result) {
      res
        .status(400)
        .json({ message: "there is no post matching your criteria" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { contentValid, postIdExists };
