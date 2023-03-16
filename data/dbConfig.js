const knex = require("knex");
const knexConfig = require("../knexfile");
const environment = process.env.NODE_ENV_ || "production";

module.exports = knex(knexConfig[environment]);
