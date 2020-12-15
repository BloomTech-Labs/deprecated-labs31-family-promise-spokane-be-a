/* eslint-disable no-debugger, no-console */
exports.up = function (knex) {
  return knex.schema.createTable('users', (tbl) => {
    tbl.increments();

    tbl.string('username', 128);

    tbl.string('name');

    tbl.string('email');

    // this gets created on sign up
    tbl.string('okta_id', 256);

    tbl.string('role').defaultsTo('pending');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
