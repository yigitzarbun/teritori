const usersModel = require("./users-model");

const userIdValid = async (req, res, next) => {
  try {
    const idExists = await usersModel.getById(req.params.id);
    if (!idExists) {
      res
        .status(400)
        .json({ message: "no users matching your search criteria" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { userIdValid };
