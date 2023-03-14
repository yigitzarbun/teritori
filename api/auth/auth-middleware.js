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

const emailValid = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "email is a required field" });
  } else {
    next();
  }
};

const districtValid = (req, res, next) => {
  const { district } = req.body;
  if (!district) {
    res.status(400).json({ message: "district is a required field" });
  } else {
    next();
  }
};
const dateValid = (req, res, next) => {
  const { signup_date } = req.body;
  if (!signup_date) {
    res.status(400).json({ message: "signup date is a required field" });
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
  emailValid,
  districtValid,
  dateValid,
  userNameTaken,
  userNameExists,
};
