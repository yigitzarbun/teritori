const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("./auth/auth-router");
const postsRouter = require("./posts/posts-router");
const commentsRouter = require("./comments/comments-router");
const usersRouter = require("./users/users-router");
const votesRouter = require("./votes/votes-router");
//const testRouter = require("./testRouter");
const followsRouter = require("./follows/follows-router");
const restrict = require("./middleware/restricted");
const server = express();
const session = require("express-session");
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(
  session({
    name: "cikolatacips",
    secret: "nobody tosses a dwarf!",
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: false,
    },
    httpOnly: false,
    resave: false,
    saveUninitialized: false,
  })
);

//server.use("/api/test", testRouter);
server.use("/api/auth", authRouter);
server.use("/api/posts", restrict, postsRouter);
server.use("/api/comments", restrict, commentsRouter);
server.use("/api/users", restrict, usersRouter);
server.use("/api/votes", restrict, votesRouter);
server.use("/api/follows", restrict, followsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "hello world" });
});

server.use("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

module.exports = server;
