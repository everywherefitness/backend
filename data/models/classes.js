const db = require('../db-config')

function getAllClasses() {
    return db('classes')
}

async function getClassById(id) {
    return await db('classes').where('class_id', id).first()
}

async function findBy(filter) {
    return await db('classes').where(filter).returning('*')
}

async function add(submittedClass) {
    return await db('classes').insert(submittedClass).returning('*')
}

function update(changes, id) {
    return db('classes').where('class_id', id).update(changes).returning('*')
}

async function remove(id) {
    return await db('classes').where('class_id', id).del()
}

module.exports = {
    getAllClasses,
    getClassById,
    add,
    findBy,
    update,
    remove
}