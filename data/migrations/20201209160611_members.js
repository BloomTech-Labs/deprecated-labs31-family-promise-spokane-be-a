// Members have their own table because the database contains specific data
// for individuals of families. Members are not users
exports.up = function (knex) {
  return knex.schema.createTable('members', (tbl) => {
    tbl.increments();

    tbl
      .integer('family_id')
      .unsigned()
      .references('id')
      .inTable('families')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tbl.date('date_of_enrollment');

    tbl.json('demographics');

    tbl.json('barriers');

    tbl.json('schools');

    tbl.integer('case_members');

    tbl.string('flag');

    tbl.integer('percent_complete');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('members');
};
