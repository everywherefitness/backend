
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('instructors').del()
    .then(function () {
      // Inserts seed entries
      return knex('instructors').insert([
        { user_id: 2, username: 'trey'},
        { user_id: 4, username: 'page'},
      ]);
    });
};
