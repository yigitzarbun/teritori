const db = require("../../data/dbConfig");

async function getAll() {
  const users = await db("users");
  return users;
}

async function getBy(filter) {
  const result = await db("users").where(filter).first();
  return result;
}

async function getById(user_id) {
  const user = await db("users").where("user_id", user_id).first();
  return user;
}

async function add(user) {
  const userIdArray = await db("users").insert(user);
  const userId = userIdArray[0];
  const newUser = await db("users").where("user_id", userId).first();
  return newUser;
}

module.exports = {
  getAll,
  getBy,
  getById,
  add,
};
