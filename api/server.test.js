const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("API END POINT TESTS", () => {
  describe("[GET] /", () => {
    test("[1] returns the correct message upon starting the server", async () => {
      const res = await request(server).get("/");
      expect(res.body).toEqual({ message: "hello world" });
      expect(res.status).toBe(200);
    });
  });
  test("[2] returns posts", async () => {
    const res = await request(server).get("/api/posts");
    expect(res.body).toHaveLength(8);
    expect(res.body[0]).toHaveProperty("title", "hey Dwight");
    expect(res.body[7]).toHaveProperty("title", "Save Bandit!");
  });
  test("[3] returns the correct post according to the given post_id", async () => {
    const res = await request(server).get("/api/posts/2");
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty("title", "this is Dwight");
  });
  test("[4] returns the correct error message if post_id is not existing", async () => {
    const res = await request(server).get("/api/posts/11111");
    expect(res.body).toEqual({
      message: "there is no post matching your criteria",
    });
  });
  test("[5] returns users", async () => {
    const res = await request(server).get("/api/users");
    expect(res.body).toHaveLength(10);
    expect(res.body[0]).toHaveProperty("username", "jim");
  });
  test("[6] returns the correct user based on given user_id", async () => {
    const res = await request(server).get("/api/users/10");
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty("username", "angela");
  });
  test("[7] returns the correct error message if user_id doesn't exist", async () => {
    const res = await request(server).get("/api/users/111111");
    expect(res.body).toEqual({
      message: "no users matching your search criteria",
    });
  });
  test("[8] returns votes", async () => {
    const res = await request(server).get("/api/votes");
    expect(res.body).toHaveLength(1);
  });
  test("[9] returns correct vote according to given vote_id", async () => {
    const res = await request(server).get("/api/votes/1");
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty("vote", "up");
  });
  test("[10] returns correct error message if vote_id is not valid", async () => {
    const res = await request(server).get("/api/votes/11111");
    expect(res.body).toEqual({ message: "vote does not exist" });
  });
  test("[11] returns comments", async () => {
    const res = await request(server).get("/api/comments");
    expect(res.body).toHaveLength(2);
  });
  test("[12] returns correct error message if given comment_id does not exist", async () => {
    const res = await request(server).get("/api/comments/1111");
    expect(res.body).toEqual({ message: "comment does not exist" });
  });
  describe("[POST] /", () => {
    test("[13] signup works", async () => {
      const newUser = {
        email: "a@b.com",
        username: "foo",
        district: "maltepe",
        avatarUrl: null,
        password: 1234,
        signup_date: "01/01/2023",
      };
      const res = await request(server)
        .post("/api/auth/register")
        .send(newUser);
      expect(res.body).toHaveProperty("user_id", 11);
    });
    test("[14] returns correct error message if email is missing", async () => {
      const newUser = {
        username: "foo",
        district: "maltepe",
        avatarUrl: null,
        password: 1234,
        signup_date: "01/01/2023",
      };
      const res = await request(server)
        .post("/api/auth/register")
        .send(newUser);
      expect(res.body).toEqual({ message: "email is a required field" });
    });
    test("[15] returns correct error message if username is missing", async () => {
      const newUser = {
        email: "a@b.com",
        district: "maltepe",
        avatarUrl: null,
        password: 1234,
        signup_date: "01/01/2023",
      };
      const res = await request(server)
        .post("/api/auth/register")
        .send(newUser);
      expect(res.body).toEqual({
        message: "Username and password are required fields",
      });
    });
    test("[16] returns correct error message if district is missing", async () => {
      const newUser = {
        email: "a@b.com",
        username: "foo",
        avatarUrl: null,
        password: 1234,
        signup_date: "01/01/2023",
      };
      const res = await request(server)
        .post("/api/auth/register")
        .send(newUser);
      expect(res.body).toEqual({ message: "district is a required field" });
    });
    test("[17] returns correct error message if password is missing", async () => {
      const newUser = {
        email: "a@b.com",
        username: "foo",
        avatarUrl: null,
        district: "maltepe",
        signup_date: "01/01/2023",
      };
      const res = await request(server)
        .post("/api/auth/register")
        .send(newUser);
      expect(res.body).toEqual({
        message: "Username and password are required fields",
      });
    });
    test("[18] returns correct error message if signup_date is missing", async () => {
      const newUser = {
        email: "a@b.com",
        username: "foo",
        avatarUrl: null,
        district: "maltepe",
        password: 1234,
      };
      const res = await request(server)
        .post("/api/auth/register")
        .send(newUser);
      expect(res.body).toEqual({
        message: "signup date is a required field",
      });
    });
    test("[19] returns correct error message if username already exists", async () => {
      const newUser = {
        email: "a@b.com",
        username: "dwight",
        avatarUrl: null,
        district: "maltepe",
        password: 1234,
        signup_date: "01/01/2023",
      };
      const res = await request(server)
        .post("/api/auth/register")
        .send(newUser);
      expect(res.body).toEqual({ message: "Username is already taken" });
    });
    /*
    test("[20] login works", async () => {
      const newUser = {
        email: "a@b.com",
        username: "foo",
        district: "maltepe",
        avatarUrl: null,
        password: 1234,
        signup_date: "01/01/2023",
      };
      const regUser = await request(server)
        .post("/api/auth/register")
        .send(newUser);
      const password = regUser.body.password;
      console.log(password);
      const res = await request(server).post("/api/auth/login").send({
        username: newUser.username,
        password: password,
      });
      expect(res.status).toBe(200);
    });
    */
    test("[21] returns correct error message if credentials don't exist", async () => {
      const user = {
        username: "foo",
        password: 1234,
      };
      const res = await request(server).post("/api/auth/login").send(user);
      expect(res.body).toEqual({ message: "Invalid credentials" });
    });
    test("[22] returns correct error message if passwod is missing", async () => {
      const user = {
        username: "foo",
      };
      const res = await request(server).post("/api/auth/login").send(user);
      expect(res.body).toEqual({
        message: "Username and password are required fields",
      });
    });
    test("[23] returns correct error message if passwod is missing", async () => {
      const user = {
        password: 1234,
      };
      const res = await request(server).post("/api/auth/login").send(user);
      expect(res.body).toEqual({
        message: "Username and password are required fields",
      });
    });
    test("[24] post comment works", async () => {
      const comment = {
        body: "bar",
        comment_date: "01/01/2023",
        district: "maltepe",
        post_id: 1,
        user_id: 1,
      };
      const res = await request(server).post("/api/comments").send(comment);
      expect(res.body).toHaveProperty("comment_id", "3", "body", "bar");
    });
    test("[25] returns correct error if body doesn't exist ", async () => {
      const comment = {
        comment_date: "01/01/2023",
        district: "maltepe",
        post_id: 1,
        user_id: 1,
      };
      const res = await request(server).post("/api/comments").send(comment);
      expect(res.body).toEqual({
        message: "required fields are missing",
      });
    });
    test("[26] returns correct error if district doesn't exist ", async () => {
      const comment = {
        body: "bar",
        comment_date: "01/01/2023",
        post_id: 1,
        user_id: 1,
      };
      const res = await request(server).post("/api/comments").send(comment);
      expect(res.body).toEqual({
        message: "required fields are missing",
      });
    });
    test("[27] post works", async () => {
      const post = {
        title: "foo",
        body: "bar",
        district: "maltepe",
        post_date: "01/01/2023",
        user_id: 1,
      };
      const res = await request(server).post("/api/posts").send(post);
      expect(res.body).toEqual({
        post_id: 9,
        title: "foo",
        body: "bar",
        district: "maltepe",
        post_date: "01/01/2023",
        user_id: 1,
      });
    });
    test("[28] returns correct error message if title is missing", async () => {
      const post = {
        body: "bar",
        district: "maltepe",
        post_date: "01/01/2023",
        user_id: 1,
      };
      const res = await request(server).post("/api/posts").send(post);
      expect(res.body).toEqual({ message: "Required fields are empty" });
    });
    test("[29] returns correct error message if body is missing", async () => {
      const post = {
        title: "foo",
        district: "maltepe",
        post_date: "01/01/2023",
        user_id: 1,
      };
      const res = await request(server).post("/api/posts").send(post);
      expect(res.body).toEqual({ message: "Required fields are empty" });
    });
    test("[30] returns correct error message if district is missing", async () => {
      const post = {
        title: "foo",
        body: "bar",
        post_date: "01/01/2023",
        user_id: 1,
      };
      const res = await request(server).post("/api/posts").send(post);
      expect(res.body).toEqual({ message: "Required fields are empty" });
    });
    test("[31] post vote works", async () => {
      const vote = {
        vote: "up",
        vote_date: "01/01/2023",
        post_id: 1,
        user_id: 2,
      };
      const res = await request(server).post("/api/votes").send(vote);
      expect(res.body).toEqual({
        vote_id: 2,
        vote: "up",
        vote_date: "01/01/2023",
        post_id: 1,
        user_id: 2,
      });
    });
  });
  describe("[PUT] /:id", () => {
    test("[32] update post works", async () => {
      const post = {
        title: "foo",
        body: "bar",
        district: "maltepe",
        post_date: "01/01/2023",
        user_id: 1,
      };
      const res = await request(server).put("/api/posts/1").send(post);
      expect(res.body).toEqual({
        post_id: 1,
        title: "foo",
        body: "bar",
        district: "maltepe",
        post_date: "01/01/2023",
        user_id: 1,
      });
    });
    test("[33] returns error message if post_id does not exist", async () => {
      const post = {
        title: "foo",
        body: "bar",
        district: "maltepe",
        post_date: "01/01/2023",
        user_id: 1,
      };
      const res = await request(server).put("/api/posts/11111").send(post);
      expect(res.body).toEqual({
        message: "there is no post matching your criteria",
      });
    });
    test("[34] returns error message if title does not exist", async () => {
      const post = {
        body: "bar",
        district: "maltepe",
        post_date: "01/01/2023",
        user_id: 1,
      };
      const res = await request(server).put("/api/posts/1").send(post);
      expect(res.body).toEqual({
        message: "Required fields are empty",
      });
    });
    test("[35] returns error message if body does not exist", async () => {
      const post = {
        title: "foo",
        district: "maltepe",
        post_date: "01/01/2023",
        user_id: 1,
      };
      const res = await request(server).put("/api/posts/1").send(post);
      expect(res.body).toEqual({
        message: "Required fields are empty",
      });
    });
    test("[34] returns error message if district does not exist", async () => {
      const post = {
        title: "foo",
        body: "bar",
        post_date: "01/01/2023",
        user_id: 1,
      };
      const res = await request(server).put("/api/posts/1").send(post);
      expect(res.body).toEqual({
        message: "Required fields are empty",
      });
    });
  });
  describe("[DELETE] /:id", () => {
    test("[35] delete post works", async () => {
      const res = await request(server).delete("/api/posts/1");
      expect(res.body).toEqual(1);
      const posts = await db("posts");
      expect(posts).toHaveLength(7);
    });
    test("[36] returns correct error message if post_id does not exis", async () => {
      const res = await request(server).delete("/api/posts/11111");
      expect(res.body).toEqual({
        message: "there is no post matching your criteria",
      });
    });
    test("[37] delete vote works", async () => {
      const res = await request(server).delete("/api/votes/1");
      expect(res.body).toEqual(1);
    });
    test("[38] returns correct message if vote_id does not exist", async () => {
      const res = await request(server).delete("/api/votes/1123123");
      expect(res.body).toEqual({ message: "vote does not exist" });
    });
  });
});
