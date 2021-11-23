
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {category_name: 'Water Aerobics'},
        {category_name: 'Aerobics'},
        {category_name: 'Cycling'},
        {category_name: 'Taekwondo'},
        {category_name: 'Yoga'},
        {category_name: 'Pilates'},
        {category_name: 'Hiking & Backpacking'}
      ]);
    });
};
