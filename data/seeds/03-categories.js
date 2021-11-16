
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {name: 'Water Aerobics'},
        {name: 'Aerobics'},
        {name: 'Cycling'},
        {name: 'Taekwondo'},
        {name: 'Yoga'},
        {name: 'Pilates'},
        {name: 'Hiking & Backpacking'}
      ]);
    });
};
