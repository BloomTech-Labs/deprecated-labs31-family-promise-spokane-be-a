/* eslint-disable no-debugger, no-console */
exports.up = function (knex) {
  return knex.schema.createTable('users', (tbl) => {
    tbl.increments();

    // TODO: check with isaiah to see if this username can stay without breaking Okta Auth
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
