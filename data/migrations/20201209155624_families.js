
exports.up = function(knex) {
    return knex.schema
        .createTable('families', tbl => {
            tbl
                .increments()

            tbl
                .integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE') // should it be 'RESTRICT'? 

            tbl
                .integer('case_number')

            tbl
                .json('phone_one')

            tbl
                .json('phone_two')

            tbl
                .json('emergencyContact')

            tbl
                .json('vehicle')

            tbl
                .string('last_permanent_address')

            tbl
                .json('homeless_info')

            tbl
                .json('gov_benefits')

            tbl
                .json('insurance')

            tbl
                .json('domestic_violence_info')

            tbl
                .string('avatar_url')
        })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('families')
};
