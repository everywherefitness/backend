const db = require('../db-config')

function find() {
  return db('clients_classes');
}

function findBy(filter) {
  return db('clients_classes')
    .where(filter)
    .returning('*');
}

function add(mapping) {
  return db('clients_classes')
    .insert(mapping)
    .returning('*');
}

function remove(class_id, client_id) {
  return db('clients_classes')
    .where({ class_id, client_id })
    .del();
}

module.exports = { find, findBy, add, remove };