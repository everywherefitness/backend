
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('clients').del()
    .then(function () {
      // Inserts seed entries
      return knex('clients').insert([
        { user_id: 3, username: 'mike'},
        { user_id: 5, username: 'fish'},
      ]);
    });
};
