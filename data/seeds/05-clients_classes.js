
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('clients_classes').del()
    .then(function () {
      // Inserts seed entries
      return knex('clients_classes').insert([
        { class_id: 1, client_id: 3},
        // { class_id: 2, client_id: 3},
        // { class_id: 3, client_id: 3},
        // { class_id: 1, client_id: 5},
        // { class_id: 2, client_id: 5},
        // { class_id: 3, client_id: 5},
      ]);
    });
};
