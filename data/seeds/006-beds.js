
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('bed_capacity')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('bed_capacity').insert([{ id: 1, total_beds: 60 }]);
    });
};
