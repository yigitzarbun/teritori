const db = require("../../data/dbConfig");

async function getAll() {
  const votes = await db("votes")
    .leftJoin("posts", "posts.post_id", "votes.post_id")
    .leftJoin("users", "users.user_id", "votes.user_id");
  return votes;
}

async function getBy(filter) {
  const result = await db("votes").where(filter).first();
  return result;
}

async function getById(vote_id) {
  const result = await db("votes").where("vote_id", vote_id).first();
  return result;
}

async function add(vote) {
  const voteIdArray = await db("votes").insert(vote);
  const voteId = voteIdArray[0];
  const newVote = await db("votes").where("vote_id", voteId).first();
  return newVote;
}

async function remove(vote_id) {
  return db("votes").where("vode_id", vote_id).del();
}

module.exports = {
  getAll,
  getBy,
  getById,
  add,
  remove,
};
