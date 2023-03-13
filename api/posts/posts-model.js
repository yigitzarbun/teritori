const db = require("../../data/dbConfig");

async function getAll() {
  const posts = await db("posts")
    .leftJoin("users", "users.user_id", "posts.user_id")
    .select("posts.*", "users.*");
  return posts;
}

async function getBy(filter) {
  const result = await db("posts").where(filter).first();
  return result;
}

async function getById(post_id) {
  const post = await db("posts").where("post_id", post_id).first();
  return post;
}

async function add(post) {
  const postIdArray = await db("posts").insert(post);
  const postId = postIdArray[0];
  const newPost = await db("posts").where("post_id", postId).first();
  return newPost;
}

async function update(post_id, changes) {
  return db("posts").where("post_id", post_id).update(changes);
}

async function remove(post_id) {
  return db("posts").where("post_id", post_id).del();
}

module.exports = {
  getAll,
  getBy,
  getById,
  add,
  update,
  remove,
};
