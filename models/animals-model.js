const db = require("../data/dbConfig");

// All animals
function getAllAnimals() {
  return db("animals");
}

// One animal based upon a filter
function findOneAnimalBy(filter) {
  return db("animals").where(filter).first();
}

// All animals based upon a filter
function findAnimalsBy(filter) {
  return db("animals").where(filter);
}

// Adds a new animal
async function add(animal) {
  const [id] = await db("animals").insert(animal);
  return findOneAnimalBy({ id });
}

function remove(id) {
  return db("animals").where({ id }).del();
}

module.exports = { getAllAnimals, findOneAnimalBy, findAnimalsBy, add, remove };
