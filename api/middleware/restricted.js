const { JWT_SECRET } = require("../../config/secrets");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedJWT) => {
      if (err) {
        res.status(401).json({ message: "invalid token" });
      } else {
        req.userInfo = decodedJWT;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "token required" });
  }
};
