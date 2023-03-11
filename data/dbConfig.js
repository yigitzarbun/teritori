const knex = require("knex");
const knexConfig = require("../knexfile");
const environment = process.env.NODE_ENV_ || "development";

module.exports = knex(knexConfig[environment]);
