exports.up = async (knex) => {
  await knex.schema
    .createTable('classes', table => {
        table.increments('class_id')
        table.string('class_name').notNullable().unique()
        table.integer('instructor_id')
            table.foreign('instructor_id')
                .references('user_id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        table.integer('category_id') // was 'type' in the readme
            table.foreign('category_id')
                .references('category_id')
                .inTable('categories')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        table.string('start_time').notNullable()
        table.string('duration').notNullable()
        table.integer('intensity_level', 10).notNullable()
        table.string('location').notNullable()
        table.integer('current_capacity')
        table.integer('max_capacity').notNullable()
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('classes')
};
