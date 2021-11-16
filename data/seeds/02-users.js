const generators = require('../../api/utils/generator')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'admin',
          username: 'admin',
          email: 'admin@admin.com',
          role_id: 1,
          password: generators.password('admin')
        },
        {
          name: 'Trey',
          username: 'jeditrey',
          email: 'trey@guitar.com',
          role_id: 2,
          password: generators.password('trey123')
        },
        {
          name: 'Mike',
          username: 'mikebombs',
          email: 'mike@bass.com',
          password: generators.password('mike123')
        },
        {
          name: 'Page',
          username: 'boardchairman',
          email: 'page@keys.com',
          role_id: 2,
          password: generators.password('page123')
        },
        {
          name: 'Fish',
          username: 'henrietta', 
          email: 'fishman@drums.com',
          password: generators.password('fish123')

        }
      ]);
    });
};
