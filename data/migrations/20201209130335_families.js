// This table is the primary table for guests.
// many members can belong to a family but only families are users
// that log in and members are attributes not users
exports.up = function (knex) {
  return knex.schema.createTable('families', (tbl) => {
    tbl.increments();

    tbl
      .string('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tbl.integer('case_number');

    tbl.jsonb('phone_one');

    tbl.jsonb('phone_two');

    tbl.jsonb('safe_alternate');

    tbl.jsonb('emergencyContact');

    tbl.jsonb('vehicle');

    tbl.string('last_permanent_address');

    tbl.jsonb('homeless_info');

    tbl.jsonb('gov_benefits');

    tbl.jsonb('insurance');

    tbl.jsonb('domestic_violence_info');

    tbl.jsonb('pets');

    tbl.string('avatar_url');

    tbl.integer('percent_complete');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('families');
};
