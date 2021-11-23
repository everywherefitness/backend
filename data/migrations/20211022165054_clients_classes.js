exports.up = async function(knex) {
    await knex.schema.createTable('clients_classes', table => {
      table.integer('class_id')
        table.foreign('class_id')
            .references('class_id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
      table.integer('client_id')
        table.foreign('client_id')
            .references('user_id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
      // table.timestamps(true, true);
      table.primary(['class_id', 'client_id']);
    });
  };
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('clients_classes');
  };