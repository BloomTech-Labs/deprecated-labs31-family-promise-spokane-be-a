/* eslint-disable no-debugger, no-console */
/* one of the main reasons we decided to connected logs to users and not families is because
if families get deleted we want to cascade down to members and delete members as well
but logs should continue to persist in the database */
exports.up = function (knex) {
  return knex.schema.createTable('logs', (tbl) => {
    tbl.increments();

    tbl
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tbl.boolean('checked_in');

    tbl.date('date');

    tbl.datetime('time');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('logs');
};
