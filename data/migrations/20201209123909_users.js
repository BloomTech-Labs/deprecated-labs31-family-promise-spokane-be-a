/* eslint-disable no-debugger, no-console */
exports.up = function (knex) {
  return knex.schema.createTable('users', (tbl) => {
    tbl.string('id').unique().notNullable();

    tbl.string('email', 128).unique().notNullable();

    tbl.string('first_name', 128).notNullable();

    tbl.string('last_name', 128).notNullable();

    tbl
      .enu('role', [
        'guest',
        'case_manager',
        'supervisor',
        'executive_director',
        'pending',
      ])
      .notNullable()
      .defaultsTo('guest');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
