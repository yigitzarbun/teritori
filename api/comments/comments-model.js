const db = require("../../data/dbConfig");

async function getAll() {
  const comments = await db("comments")
    .leftJoin("users", "users.user_id", "comments.user_id")
    .leftJoin("posts", "posts.post_id", "comments.post_id")
    .select("comments.*", "users.*", "posts.post_id");
  return comments;
}

async function getBy(filter) {
  const result = await db("comments").where(filter).first();
  return result;
}

async function getById(comment_id) {
  const result = await db("comments").where("comment_id", comment_id).first();
  return result;
}

async function add(comment) {
  const commentIdArray = await db("comments").insert(comment);
  const commentId = commentIdArray[0];
  const result = await db("comments").where("comment_id", commentId).first();
  return result;
}

module.exports = {
  getAll,
  getBy,
  getById,
  add,
};
