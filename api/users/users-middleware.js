const usersModel = require("./users-model");

const userIdValid = async (req, res, next) => {
  const { id } = req.params;
  const idExists = await usersModel.getById({ id });
  if (!idExists) {
    res.status(400).json({ message: "no users matching your search criteria" });
  } else {
    next();
  }
};

module.exports = { userIdValid };
