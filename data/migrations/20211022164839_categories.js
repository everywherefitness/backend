exports.up = async function(knex) {
    await knex.schema
      .createTable('categories', table => {
          table.increments('category_id')
          table.string('name').notNullable()
      })
  };
  
  exports.down = async function(knex) {
      await knex.schema.dropTableIfExists('categories')
  };
  