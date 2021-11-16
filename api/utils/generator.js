const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

function password(data) {
    return bcrypt.hashSync(data, parseInt(process.env.BCRYPT_ROUNDS) || 8)
}

function token(user) {
    const payload = {
        subject: user.user_id,
        username: user.username,
        role_id: user.role_id
    }
    const options = {
        expiresIn: '1d'
    }
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        options
    )
    return token
}

module.exports = { token, password }