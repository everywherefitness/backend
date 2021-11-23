const generators = require('../../api/utils/generator')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'admin',
          email: 'admin@admin.com',
          role_id: 1,
          password: generators.password('admin')
        },
        {
          username: 'trey',
          email: 'trey@guitar.com',
          role_id: 2,
          password: generators.password('trey')
        },
        {
          username: 'mike',
          email: 'mike@bass.com',
          password: generators.password('mike')
        },
        {
          username: 'page',
          email: 'page@keys.com',
          role_id: 2,
          password: generators.password('page')
        },
        {
          username: 'fish', 
          email: 'fishman@drums.com',
          password: generators.password('fish')

        }
      ]);
    });
};
