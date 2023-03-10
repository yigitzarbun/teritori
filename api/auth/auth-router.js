const router = require("express").Router();
const { JWT_SECRET } = require("../secrets");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersModel = require("../users/users-model");
const secrets = require("../secrets");
const authMd = require("./auth-middleware");

router.post(
  "/register",
  authMd.userNameValid,
  authMd.passwordValid,
  authMd.userNameTaken,
  async (req, res, next) => {
    try {
      const credentials = req.body;
      const hash = bcrypt.hashSync(credentials.password.toString(), 8);
      credentials.password = hash;
      const newUser = await usersModel.add(credentials);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  authMd.userNameValid,
  authMd.passwordValid,
  authMd.userNameExists,
  (req, res, next) => {
    const { username, password } = req.body;
    usersModel
      .getBy({ username })
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          //const token = generateToken(user);
          req.session.user = user;
          res.status(200).json(user);
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch(next);
  }
);

function generateToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
  };
  const options = {
    expiresIn: "4h",
  };
  return jwt.sign(payload, secrets.JWT_SECRET, options);
}
module.exports = router;
