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

    tbl.json('demographics');

    tbl.json('bearers');

    tbl.json('schools');

    tbl.string('flag');

    tbl.integer('pet');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('members');
};
