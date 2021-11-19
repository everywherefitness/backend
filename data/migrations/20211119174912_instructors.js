exports.up = async function(knex) {
    await knex.schema
        .createTable('instructors', table => {
            table.integer('user_id')
                table.foreign('user_id')
                    .references('user_id')
                    .inTable('users')
                    .onUpdate('CASCADE')
                    .onDelete('CASCADE')
            table.string('username')
                table.foreign('username')
                    .references('username')
                    .inTable('users')
                    .onUpdate('CASCADE')
                    .onDelete('CASCADE')
        })
  };
  
  exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('instructors')
  };