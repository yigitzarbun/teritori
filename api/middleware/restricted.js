const { JWT_SECRET } = require("../../config/secrets");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.headers["authorization"];
  token = JSON.parse(token);
  console.log(token);
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedJWT) => {
      if (err) {
        res.status(401).json({ message: "token exists but it is invalid " });
      } else {
        req.userInfo = decodedJWT;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "token required" });
  }
};
