const Users = require('./../../../data/models/users')
const schemas = require('./schemas/schemas')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// AUTH - routes pertaining to /api/auth/

// [POST] - register - checks that body passes the new user schema
function validateBody(req, res, next) {
    // try {
    //     // const validSubmission = await schemas.registerSchema.validate(
    //     //     req.body,
    //     //     { strict: false, stripUnknown: true }
    //     // )
    //     // req.body = validSubmission
    //     const validSubmission = await schemas.registerSchema.isValid(req.body)
    //     if (validSubmission) {
    //       next()
    //     } else {
    //         next({ status: 422, message: 'submission error here'})
    //     }
    //     // this is where I would need to start to give correct error messages back based on which part of the schema fails
    // } catch(err) {
    //     next({ status: 422, message: `Submission does not pass new user schema` })
    // }
    schemas.registerSchema.isValid(req.body)
        .then(() => {
            next()
        })
        .catch(next ({ status: 422 }))
}

// [POST] - register - checks that username is free in db
async function checksUsernameIsFree(req, res, next) {
    const { username } = req.body
    try {
        const checking = await Users.findBy({ username })
        if (!checking) {
            next()
        } else {
            next({ status: 422, message: `Username taken`})
        }
    } catch(err) {
        next(err)
    }
}

// [POST] - login - checks that the user exists in db
async function checksUsernameExists(req, res, next){
    const { username } = req.body
    try {
        const checking = await Users.findBy({ username })
        if (!checking) {
            next({ status: 404, message: `Username not found`})
        } else {
            next()
        }
    } catch(err) {
        next(err)
    }
}

// [POST] - login - checks the password submitted is correct
async function checksPassword(req, res, next){
    const { username } = req.body

    Users.findBy({ username })
        .then(returnedUser => {
            if (returnedUser && bcrypt.compareSync(req.body.password, returnedUser.password)) {
                req.body = returnedUser
                next()
            } else {
                next({ status: 401, message: 'Wrong password' })
            }
        })
        .catch(next)
}
// ----- end of AUTH related middleware ------- //

// related to /api/classes, /api/users/, /api/categories
// mw that prevents access if the user has not signed in to their account

// RESTRICTED - restricts non-logged in users from accessing site
function restrictedAccess(req, res, next) {
    const token = req.headers.authorization

    if (!token) {
        return next({ status: 401, message: `Token is required for access`})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return next({ status: 401, message: `Token is not valid`})
        }
        req.decodedToken = decodedToken
        return next()
    })
}

// ONLY - allows dev to set which permitted/authenticated users can see which portions of site
const only = (roles) => (req, res, next) => {
    // console.log(roles)
    if (roles.includes(req.decodedToken.role_id)) {
        next()
    }  else {
        next({ status: 403, message: `User's role is not verified for access`})
    }
}

// ----- end of restricted and only related middleware ------- //



module.exports = {
    validateBody,
    checksUsernameIsFree,
    checksUsernameExists,
    checksPassword,
    restrictedAccess,
    only
}