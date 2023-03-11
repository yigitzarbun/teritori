const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("./auth/auth-router");
const postsRouter = require("./posts/posts-router");
const server = express();
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "hello world" });
});

module.exports = server;
