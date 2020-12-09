
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
            .onDelete('RESTRICT')
            .onUpdate('CASCADE') // @abdi should it be 'RESTRICT'? 

        tbl
            .integer('author')
            .unsigned() 
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')

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
