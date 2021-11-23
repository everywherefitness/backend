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
            const hammeredUserObj = {
                username: user.username,
                user_id: user.user_id
            }
            if (user.role_id === 3) {
                Users.addToClients(hammeredUserObj)
                    .then(user => {
                        res.status(201).json({
                            user,
                            message: `Ahoy, ${user[0].username}`})
                    })
                    .catch(err => next(err))
            }
            if (user.role_id === 2) {
                Users.addToInstructors(hammeredUserObj)
                    .then(user => {
                        res.status(201).json({
                            user,
                            message: `Ahoy, ${user[0].username}`})
                    })
                    .catch(err => {next(err)})
            }
        })
        .catch(err => {
            // and  link up error stuff linke 12 from mw.routes.js
            // console.log(err)
            next(err)
        })
}

// function addToCorrectDatabase(req, res, next) {
//     let user = req.body

//     if (user.role_id === 3) {
//         Users.addToClients(user)
//             .then(resp => {
//                 res.json(resp)
//             })
//             .catch(err => {next(err)})
//     }
// }

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