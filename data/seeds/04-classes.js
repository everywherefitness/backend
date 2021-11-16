
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('classes').del()
    .then(function () {
      // Inserts seed entries
      return knex('classes').insert([
        {
          name: 'Speed-jaywalking',
          category_id: 1,
          instructor_id: 2,  
          start_time: '10:00 AM',
          duration: '2 hours',
          intensity_level: 4,
          location: 'Downtown NYC',
          current_capacity: (Math.floor(Math.random()*30)),
          max_capacity: 30
        },
        {
          name: 'Pool Hopping',
          category_id: 2,
          instructor_id: 4,
          start_time: '11:30 PM',
          duration: '1 hour',
          intensity_level: 9,
          location: 'Gated Neighborhoods',
          current_capacity: (Math.floor(Math.random()*30)),
          max_capacity: 30
        },
        {
          name: 'Roofing',
          category_id: 4,
          instructor_id: 2,
          start_time: '11:30 PM',
          duration: '1 hour',
          intensity_level: 9,
          location: 'Gated Neighborhoods',
          current_capacity: (Math.floor(Math.random()*30)),
          max_capacity: 30
        }
      ]);
    });
};
