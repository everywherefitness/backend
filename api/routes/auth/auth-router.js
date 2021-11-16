const authRouter = require('express').Router()
const Users = require('../../../data/models/users')
const generators = require('../../utils/generator')
const mw = require('../../middleware/routes/mw.routes')

// [POST] - registers new user
function registerNewUser(req, res, next) {
    let user = req.body
    const hash = generators.password(user.password)
    user.password = hash

    Users.add(user)
        .then(user => {
            res.status(201).json({
                message: `Ahoy, ${user.username}, welcome aboard!`,
                user
            }) 
        })
        .catch(err => {
            // and  link up error stuff linke 12 from mw.routes.js
            // console.log(err)
            next(err)
        })
}

// [POST] - logs  user in
function loginUser (req, res) {
    const { user_id, username, role_id } = req.body
    const token = generators.token(req.body)
    res.status(200).json({
        message: `Welcome back ${req.body.username}`,
        token,
        user: {
            role_id: role_id,
            user_id: user_id,
            username: username
        }
    })
}

authRouter
    .post('/register', mw.checksUsernameIsFree, registerNewUser)
    .post('/login', mw.checksUsernameExists, mw.checksPassword, loginUser)

module.exports = authRouter;