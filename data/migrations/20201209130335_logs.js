/* eslint-disable no-debugger, no-console */
exports.up = function(knex) {
    return knex.schema
    .createTable('logs', tbl => {
        tbl
            .increments()
        
        tbl
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')

        tbl
            .boolean('checked_in')

        tbl
            .date('date')

        tbl
            .datetime('time')
      })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('logs')
};
