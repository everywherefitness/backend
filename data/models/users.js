const db = require('../db-config')

function getAllUsers() { 
    return db('users')
}

async function getById(id) {
    const row = await db('users').where('user_id', id).first()
    const result = {
        user_id: row.user_id,
        name: row.name,
        username: row.username,
        email: row.email,
        role_id: row.role_id,
    }
    return result
}

async function findBy(filter) {
    return await db('users').where(filter).first()
}

async function add(user) {
  const [newUserObject] = await db('users').insert(user, ['user_id'])
  return getById(newUserObject.user_id)
}

// create addClient and addInstructor to separate tables

async function addToClients(user) {
    return await db('clients').insert(user).returning('*')
}

async function addToInstructors(user) {
    return await db('instructors').insert(user).returning('*')
}

function update(changes, id) {
    return db('users').where('user_id', id).update(changes).returning('*')
}

async function remove(id) {
    return await db('users').where('user_id', id).del()
}

async function retrieveClassesPerUser(client_id) {
    return await db('users as u')
        .leftJoin('clients_classes as cc')
        .select('*')
        .where('u.user_id', client_id)
}

module.exports = {
    getAllUsers,
    getById,
    findBy,
    add,
    update,
    remove,
    retrieveClassesPerUser,
    addToClients,
    addToInstructors
}