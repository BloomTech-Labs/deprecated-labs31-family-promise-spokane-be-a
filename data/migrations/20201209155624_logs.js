/* eslint-disable no-debugger, no-console */
exports.up = function (knex) {
  return knex.schema.createTable('logs', (tbl) => {
    tbl.increments('reservation_id');

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

    tbl.boolean('reservation_status');

    tbl.boolean('waitlist');

    tbl.boolean('on_site_7pm');

    tbl.boolean('on_site_10pm');

    tbl.string('date');

    tbl.string('time');

    tbl.integer('beds_reserved');

    tbl.integer('actual_beds_reserved');

    tbl.specificType('members_staying', 'text[]');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('logs');
};
