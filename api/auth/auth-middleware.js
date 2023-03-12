const usersModel = require("../users/users-model");

// Does username exist in req.body >>>
const userNameValid = (req, res, next) => {
  const { username } = req.body;
  if (!username) {
    res
      .status(400)
      .json({ message: "Username and password are required fields" });
  } else {
    next();
  }
};

// Does password exist in req.body >>>
const passwordValid = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    res
      .status(400)
      .json({ message: "Username and password are required fields" });
  } else {
    next();
  }
};

// Does username exists in DB (SIGN UP) >>>
const userNameTaken = async (req, res, next) => {
  const { username } = req.body;
  const userNameUnique = await usersModel.getBy({ username });
  if (userNameUnique) {
    res.status(400).json({ message: "Username is already taken" });
  } else {
    next();
  }
};

// Does username exists in DB (LOGIN) >>>
const userNameExists = async (req, res, next) => {
  const { username } = req.body;
  const userValid = await usersModel.getBy({ username });
  if (!userValid) {
    res.status(400).json({ message: "Invalid credentials" });
  } else {
    next();
  }
};

module.exports = {
  userNameValid,
  passwordValid,
  userNameTaken,
  userNameExists,
};
