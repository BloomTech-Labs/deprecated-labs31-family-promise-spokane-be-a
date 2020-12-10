
exports.up = function(knex) {
    return knex.schema
    .createTable('notes', tbl => {
        tbl
            .increments()
        tbl
            .integer('family_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('families')
            .onDelete('RESTRICT') // should stay 'RESTRICT' to keep notes in the database in case families with notes on their files return to shelter in the future
            .onUpdate('CASCADE') 

        tbl
            .integer('author')
            .unsigned() 
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('RESTRICT') // users should never be deleted 
            .onUpdate('CASCADE') 

        tbl
            .string('subject')
            .notNullable()

        tbl
            .string('content')
            .notNullable()

        tbl
            .date('date')

        tbl
            .datetime('time')
      })
};

exports.down = function(knex) {
  
};
