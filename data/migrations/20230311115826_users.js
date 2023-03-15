/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments("user_id");
      tbl.string("username", 140).unique().notNullable();
      tbl.string("password", 140).notNullable();
      tbl.string("email").unique().notNullable();
      tbl.string("district").notNullable();
      tbl.timestamp("signup_date").notNullable();
      tbl.string("avatarUrl");
    })
    .createTable("posts", (tbl) => {
      tbl.increments("post_id");
      tbl.string("title", 300).notNullable().unique();
      tbl.string("body", 500).notNullable();
      tbl.string("district").notNullable();
      tbl.timestamp("post_date").notNullable();
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("comments", (tbl) => {
      tbl.increments("comment_id");
      tbl.string("body");
      tbl.timestamp("comment_date").notNullable();
      tbl.string("district").notNullable();
      tbl
        .integer("post_id")
        .unsigned()
        .references("post_id")
        .inTable("posts")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("votes", (tbl) => {
      tbl.increments("vote_id");
      tbl.string("vote");
      tbl.timestamp("vote_date").notNullable();
      tbl
        .integer("post_id")
        .unsigned()
        .references("post_id")
        .inTable("posts")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("follows", (tbl) => {
      tbl.increments("follow_id");
      tbl.string("follow_status").notNullable();
      tbl.timestamp("follow_date").notNullable();
      tbl
        .integer("followee_id")
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("follower_id")
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("votes")
    .dropTableIfExists("comments")
    .dropTableIfExists("posts")
    .dropTableIfExists("users");
};
