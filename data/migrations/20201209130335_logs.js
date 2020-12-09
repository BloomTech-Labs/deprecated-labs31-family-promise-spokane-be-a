/* eslint-disable no-debugger, no-console */
exports.up = function(knex) {
    return knex.schema
    .createTable('logs', tbl => {
        tbl
            .increments()
        tbl
            .date('date')
        tbl
            .datetime('time');
      })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('logs')
};
