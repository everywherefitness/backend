const categoriesRouter = require('express').Router()
const Categories = require('../../../data/models/categories')
const mw = require('../../middleware/routes/mw.routes')

// [GET] - gets all categories
function allCategories(req, res, next) {
    Categories.getAllCategories()
        .then(categories => {
            res.status(200).json(categories)
        })
        .catch(next)
}

// [GET] - category by id
function categoryById(req, res, next) {
    Categories.getCategoryById(req.params.id)
        .then(category => {
            res.status(200).json(category)
        })
        .catch(next)
}

// [POST] - create new category
function createNewCategory(req, res, next) {
    const submittedCategory = req.body
    Categories.add(submittedCategory)
        .then(newCategory => {
            res.status(201).json(newCategory)
        })
        .catch(next)
}

// [PUT] - edit existing category by id
function editCategory(req, res, next) {
    const changes = req.body
    Categories.update(changes, req.params.id)
    // revisit and rename
        .then(edit => {
            res.json(edit[0])
        })
        .catch(next)
}

// [DELETE] - delete category by id
function deleteCategory(req, res, next) {
    Categories.remove(req.params.id)
        .then(() => {
            res.json({
                message: `Class with id ${req.params.id} has been deleted`
            })
        })
        .catch(next)
}

categoriesRouter
    .get('/', allCategories)
    .get('/:id', categoryById)
    .post('/', mw.only([1, 2]), createNewCategory)
    .put('/:id', mw.only([1, 2]), editCategory)
    .delete('/:id', mw.only([1, 2]), deleteCategory)
    
module.exports = categoriesRouter;