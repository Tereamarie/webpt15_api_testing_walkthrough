const knex = require("knex");
const knexfile = require("../knexfile");
const db_environment = process.env.DB_ENV || "development";

module.exports = knex(knexfile[db_environment]);
