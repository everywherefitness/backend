const generators = require('../../api/utils/generator')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          given_name: 'admin',
          username: 'admin',
          email: 'admin@admin.com',
          role_id: 1,
          password: generators.password('admin')
        },
        {
          given_name: 'Trey',
          username: 'trey',
          email: 'trey@guitar.com',
          role_id: 2,
          password: generators.password('trey')
        },
        {
          given_name: 'Mike',
          username: 'mike',
          email: 'mike@bass.com',
          password: generators.password('mike')
        },
        {
          given_name: 'Page',
          username: 'page',
          email: 'page@keys.com',
          role_id: 2,
          password: generators.password('page')
        },
        {
          given_name: 'Fish',
          username: 'fish', 
          email: 'fishman@drums.com',
          password: generators.password('fish')

        }
      ]);
    });
};
