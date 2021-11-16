const db = require('../db-config')

function getAllCategories() {
    return db('categories')
}

async function getCategoryById(id) {
    return await db('categories').where('category_id', id).first()
}

async function findBy(filter) {
    return await db('categories').where(filter).first()
}

async function add(newCategory) {
    return await db('categories').insert(newCategory).returning('*')
}

function update(changes, id) {
    return db('categories').where('category_id', id).update(changes).returning('*')
}

async function remove(id) {
    return await db('categories').where('category_id', id).del()
}

module.exports = {
    getAllCategories,
    getCategoryById,
    findBy,
    add,
    update,
    remove
}