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

    //household_type string example: Household with Adults and Children
    tbl.string('household_type');

    // length_of_stay string example: One month or more, but less than 90 days
    tbl.string('length_of_stay');

    tbl.json('demographics');

    tbl.json('barriers');

    tbl.json('schools');

    tbl.integer('case_members');

    // predicted_exit_destination examples: permanent exit, temporary exit. unknown
    tbl.string('predicted_exit_destination');

    tbl.string('flag');

    tbl.integer('percent_complete');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('members');
};
