exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("animals")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("animals").insert([
        { name: "Tony", species: "Tiger", age: 0.5 },
        { name: "Brownie", species: "Guinea Pig", age: 0.75 },
        { name: "Kaldi", species: "Golden Retriever", age: 1.3 },
        { name: "Graeme", species: "Irish Wolfhound", age: 3.5 },
      ]);
    });
};
