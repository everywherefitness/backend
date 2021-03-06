const usersRouter = require('express').Router()
const Users = require('../../../data/models/users')
const mw = require('../../middleware/routes/mw.routes')
const ClientsClasses = require('../../../data/models/clients_classes')
const Classes = require('../../../data/models/classes')

// [GET] - gets all users
function allUsers(req, res, next) {
    Users.getAllUsers()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(next)
  }

// [GET] - gets user by id
function userById(req, res, next) {
    Users.getById(req.params.id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(next)
}

// [PUT] - edits existing user by id
function editUser(req, res, next) {
    const changes = req.body
    Users.update(req.params.id, changes)
        .then(edit => {
            res.json(edit[0])
        })
        .catch(next)
}

// [DELETE] - deletes user by id
function deleteUser(req, res, next) {
    Users.remove(req.params.id)
        .then(() => {
            res.json({
                message: `User with id ${req.params.id} has been deleted`
            })
        })
        .catch(next)
}

// [GET] - get all classes per specific user
function classesPerUser(req, res, next) {
    ClientsClasses.findBy({ client_id: req.params.client_id })
        .then(enrolledClasses => {
            res.json(enrolledClasses)
        })
        .catch(next)
}

// [POST] - add a user to a class
function addUserToClass(req, res, next) {
    const { class_id, client_id } = req.params
    ClientsClasses.add({ class_id: class_id, client_id: client_id })
        .then(newlyJoinedClass => {
            res.json(newlyJoinedClass)
        })
        .catch(next)
}

// [DELETE] - remove a user from a class
// REVISIT and change this probably
function removeUserFromClass(req, res, next) {
    const { class_id, client_id } = req.params
    ClientsClasses.remove({ class_id: class_id, client_id: client_id })
        .then(() => {
            ClientsClasses.findBy({ client_id: client_id })
                .then(enrolledClasses => {
                    res.json(enrolledClasses)
                })
                .catch(next)
        })
        .catch(next)
}

// [GET] - get all classes per specific instructor
function classesPerInstructor(req, res, next) {
    Classes.findBy({ instructor_id: req.params.client_id })
        .then(instructorClasses => {
            res.json(instructorClasses)
        })
        .catch(next)
}

usersRouter
    .get('/', mw.only([1]), allUsers)
    .get('/:id', mw.only([1, 3]), userById)
    .put('/:id', editUser)
    .delete('/:id', mw.only([1, 3]), deleteUser)
    .get('/:client_id/cli/classes', mw.only([1, 3]), classesPerUser)
    .get('/:client_id/inst/classes', mw.only([1, 2]), classesPerInstructor)
    .post('/:client_id/classes/:class_id', addUserToClass)
    .delete('/:client_id/classes/:class_id', removeUserFromClass)

module.exports = usersRouter;