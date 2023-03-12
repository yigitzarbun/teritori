/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("votes").truncate();
  await knex("comments").truncate();
  await knex("posts").truncate();
  await knex("users").truncate();
  await knex("users").insert([
    {
      username: "test_user",
      password: 1234,
      email: "test@test.com",
      district: "maltepe",
      signup_date: "2023 - 01 - 01",
    },
    {
      username: "test_user2",
      password: 1234,
      email: "test2@test.com",
      district: "kadıköy",
      signup_date: "2023 - 01 - 02",
    },
  ]);
  await knex("posts").insert([
    {
      title: "test_title",
      body: "this is a test post",
      district: "maltepe",
      post_date: "2023 - 01 - 01",
      user_id: 1,
    },
  ]);
  await knex("comments").insert([
    {
      body: "this is a test comment",
      comment_date: "2023 - 01 - 01",
      district: "maltepe",
      post_id: 1,
      user_id: 2,
    },
  ]);
  await knex("votes").insert([
    {
      vote: "up",
      vote_date: "2023 - 01 - 01",
      post_id: 1,
      user_id: 2,
    },
  ]);
};
