/* eslint-disable no-debugger, no-console */
exports.up = function (knex) {
  return knex.schema.createTable('logs', (tbl) => {
    tbl.increments();

    tbl
      .string('supervisor_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tbl
      .integer('family_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('families')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tbl.boolean('checked_in');

    tbl.boolean('on_sight');

    tbl.date('date');

    tbl.datetime('time');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('logs');
};
