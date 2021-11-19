const db = require('../db-config')

function find() {
  return db('clients_classes');
}

function findBy(filter) {
  return db('clients_classes')
    .where(filter)
    .returning('*');
}

async function add(class_id, client_id) {
  await db('clients_classes as cC')
    .insert(class_id, client_id)
            
  return await db('clients_classes as CC')
    .leftJoin('classes as c', 'CC.class_id', 'c.class_id')
    .leftJoin('categories as cats', 'c.category_id', 'cats.category_id')
    .leftJoin('clients as cli', 'CC.client_id', 'cli.user_id')
    .leftJoin('instructors as i', 'i.user_id', 'c.instructor_id')
    .select('CC.*', 'c.class_name', 'c.start_time', 'c.duration', 'c.intensity_level', 'c.location', 'c.current_capacity', 'c.max_capacity', 'cats.*', 'cli.username as client_username', 'i.username as instructor_username')
}

function remove(class_id, client_id) {
  return db('clients_classes')
    .where(class_id, client_id)
    .del(); // returns 0 or 1 based on whether it could delete or not
}

module.exports = { find, findBy, add, remove };