const db = require("../../data/dbConfig");

async function getAll() {
  const follows = db("follows").leftJoin(
    "users",
    "users.user_id",
    "follows.follower_id"
  );

  return follows;
}

async function getById(follow_id) {
  const result = await db("follows").where("follow_id", follow_id).first();
  return result;
}

async function add(follow) {
  const followIdArray = await db("follows").insert(follow);
  const followId = followIdArray[0];
  const newFollow = await db("follows").where("follow_id", followId).first();
  return newFollow;
}

async function remove(follow_id) {
  return db("follows").where("follow_id", follow_id).del();
}

module.exports = { getAll, getById, add, remove };
