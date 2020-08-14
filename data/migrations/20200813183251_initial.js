exports.up = async function (knex) {
  await knex.schema.createTable("animals", (table) => {
    table.increments("id");
    table.text("name").notNullable();
    table.text("species").notNullable();
    table.float("age").notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("animals");
};
