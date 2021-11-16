const classesRouter = require('express').Router()
const Classes = require('../../../data/models/classes')
const mw = require('../../middleware/routes/mw.routes')

// [GET] - get all classes
function allClasses(req, res, next) {
    Classes.getAllClasses()
        .then(classes => {
            res.status(200).json(classes)
        })
        .catch(next)
}

// [GET] - get class by id
function classById(req, res, next) {
    Classes.getClassById(req.params.id)
        .then(fitnessClass => {
            res.status(200).json(fitnessClass)
        })
        .catch(next)
}

// [POST] - create new class
function createNewClass(req, res, next) {
    const submittedClass = req.body
    Classes.add(submittedClass)
        .then(newClass => {
            res.status(201).json(newClass)
        })
        .catch(next)
}

// [PUT] - edit class by id
function editClass(req, res, next) {
    const changes = req.body
    Classes.update(changes, req.params.id)
        .then(edit => {
            res.json(edit[0])
        })
        .catch(next)
}

// [DELETE] - delete class by id
function deleteClass(req, res, next) {
    Classes.remove(req.params.id)
        .then(() => {
            res.json({
                message: `Class with id ${req.params.id} has been deleted`
            })
        })
        .catch(next)
}

classesRouter
    .get('/', allClasses)
    .get('/:id', classById)
    .post('/', mw.only([1, 2]), createNewClass)
    .put('/:id', mw.only([1, 2]), editClass)
    .delete('/:id', mw.only([1, 2]), deleteClass)

module.exports = classesRouter;