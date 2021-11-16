exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (table) => {
      table.increments('user_id')
      table.string('name').notNullable()
      table.string('username').notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.integer('role_id').defaultTo(3) // so that if a role is not selected, the user created is a member of the gym
        table.foreign('role_id')
            .references('role_id')
            .inTable('roles')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users')
}