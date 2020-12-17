/* eslint-disable no-debugger, no-console */
exports.up = function (knex) {
  return knex.schema.createTable('users', (tbl) => {
    tbl.string('id').unique().notNullable()

    tbl.string('email', 128).unique().notNullable()

    tbl.string('first_name', 128).notNullable()

    tbl.string('last_name', 128).notNullable()

    // this gets created on sign up
    
    tbl.enu('role',['pending', 'guest', 'case_manager', 'supervisor', 'executive_director']).notNullable().defaultsTo('pending')
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
