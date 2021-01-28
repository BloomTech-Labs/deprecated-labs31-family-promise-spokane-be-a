// single endpoint for storing the total bed capacity

exports.up = function (knex) {
  return knex.schema.createTable('bed_capacity', (tbl) => {
    tbl.increments('id');

    tbl.integer('total_beds');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('bed_capacity');
};
