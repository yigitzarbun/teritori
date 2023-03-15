/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("follows").truncate();
  await knex("votes").truncate();
  await knex("comments").truncate();
  await knex("posts").truncate();
  await knex("users").truncate();

  await knex("users").insert([
    {
      username: "jim",
      password: 1234,
      email: "jim@dm.com",
      district: "maltepe",
      signup_date: "01/01/2023",
      avatarUrl:
        "https://fastly.picsum.photos/id/582/200/300.jpg?hmac=dU7Y_b9LUlVjAWIZ7AJRvue6QpYvaEkOFbUj75FrFAc",
    },
    {
      username: "dwight",
      password: 1234,
      email: "dwight@dm.com",
      district: "kartal",
      signup_date: "04/12/2023",
      avatarUrl:
        "https://fastly.picsum.photos/id/903/200/300.jpg?hmac=bT2dTWTFYT3TyM7cBatAwmhTtJuzlHBXtqn_kH-z3lU",
    },
    {
      username: "michael",
      password: 1234,
      email: "michael@dm.com",
      district: "kadıköy",
      signup_date: "04/12/2023",
      avatarUrl:
        "https://fastly.picsum.photos/id/102/200/300.jpg?hmac=nMR8Al8ea36mJZJbJNFVaddoG8aP4gUCDiEm4r6PUbk",
    },
    {
      username: "pam",
      password: 1234,
      email: "pam@dm.com",
      district: "kadıköy",
      signup_date: "11/01/2023",
      avatarUrl:
        "https://fastly.picsum.photos/id/316/200/300.jpg?hmac=sq0VBO6H0wGg9Prod7MVUUB_7B91kmD5E1X1TRSo66U",
    },
    {
      username: "oscar",
      password: 1234,
      email: "oscar@dm.com",
      district: "kadıköy",
      signup_date: "05/08/2023",
      avatarUrl:
        "https://fastly.picsum.photos/id/1073/200/300.jpg?hmac=j6ROutB6dK_56A4aAvjzWqBP0Q7RGmXYnHlL4T-R2a8",
    },
    {
      username: "creed",
      password: 1234,
      email: "creed@dm.com",
      district: "maltepe",
      signup_date: "19/06/2023",
      avatarUrl:
        "https://fastly.picsum.photos/id/730/200/300.jpg?hmac=Xa_29B3ZIok8lz4JGLZUBU_ARxJew0twrMWMHEy_T1I",
    },
    {
      username: "andy",
      password: 1234,
      email: "andy@dm.com",
      district: "kartal",
      signup_date: "02/10/2023",
      avatarUrl:
        "https://fastly.picsum.photos/id/250/200/300.jpg?hmac=igVdxs-AgITpHwPAZ80mpAfmhrGBvN_xThJlhp7vOqE",
    },
    {
      username: "kevin",
      password: 1234,
      email: "kevin@dm.com",
      district: "maltepe",
      signup_date: "15/11/2023",
      avatarUrl:
        "https://fastly.picsum.photos/id/493/200/300.jpg?hmac=grrcfhF-iSyQuaMEkd8b4OH6Gn2W3xm7dUL4-955Vxw",
    },
    {
      username: "toby",
      password: 1234,
      email: "toby@dm.com",
      district: "kartal",
      signup_date: "31/12/2023",
      avatarUrl:
        "https://fastly.picsum.photos/id/650/200/300.jpg?hmac=iNg9Umek-SwBR_yU0igvABZSTcRJFdhp1zyaqp0PdIw",
    },
    {
      username: "angela",
      password: 1234,
      email: "angela@dm.com",
      district: "kartal",
      signup_date: "15/08/2023",
      avatarUrl:
        "https://fastly.picsum.photos/id/338/200/300.jpg?hmac=rE5P3WDLKY1VMpd9y_FLo_OKhTzG4_3zCbGjKvgOL5w",
    },
  ]);
  await knex("posts").insert([
    {
      title: "hey Dwight",
      body: "Assistant to the Regional Manager",
      district: "maltepe",
      post_date: "01/01/2023",
      user_id: 1,
    },
    {
      title: "this is Dwight",
      body: "Regional Manager at Dunder Mifflin!",
      district: "maltepe",
      post_date: "04/12/2023",
      user_id: 2,
    },
    {
      title: "this is Michael Scott!",
      body: "Do I need to be liked? Absolutely not. I like to be liked. I enjoy being liked. I have to be liked. But it’s not like this compulsive need like my need to be praised.",
      district: "maltepe",
      post_date: "04/12/2023",
      user_id: 3,
    },
    {
      title: "there's a lot of beauty in ordinary things..",
      body: "I suggested we flip a coin, but Angela said she doesn't like to gamble..",
      district: "maltepe",
      post_date: "11/01/2023",
      user_id: 4,
    },
    {
      title: "let's stop casual Friday if not everyone can behave like adults",
      body: "Meredith, your boob is out!",
      district: "maltepe",
      post_date: "05/08/2023",
      user_id: 5,
    },
    {
      title: "Later, Skater.",
      body: "My tombstone has been already made, thank you. - Creed Bratton",
      district: "maltepe",
      post_date: "19/06/2023",
      user_id: 6,
    },
    {
      title: "When I got the nickname Bonerchamp, that's when I became me",
      body: "I wish there was a way to know you were in the good old days before you actually left them.",
      district: "maltepe",
      post_date: "02/10/2023",
      user_id: 7,
    },
    {
      title: "Save Bandit!",
      body: "I don't have a headache. I'm just preparing.",
      district: "maltepe",
      post_date: "15/08/2023",
      user_id: 10,
    },
  ]);
  await knex("comments").insert([
    {
      body: "Assistant to the Regional Manager",
      comment_date: "01/01/2023",
      district: "maltepe",
      post_id: 2,
      user_id: 1,
    },
    {
      body: "shut up Halpert!",
      comment_date: "02/01/2023",
      district: "maltepe",
      post_id: 2,
      user_id: 2,
    },
  ]);
  await knex("votes").insert([
    {
      vote: "up",
      vote_date: "02/01/2023",
      post_id: 1,
      user_id: 2,
    },
  ]);
  await knex("follows").insert([
    {
      follow_status: "true",
      follow_date: "10/02/2023",
      followee_id: 1,
      follower_id: 2,
    },
  ]);
};
