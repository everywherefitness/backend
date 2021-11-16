const yup = require('yup')

const registerSchema = yup.object().shape({
    name: yup
        .string()
        .required()
        .max(15)
        .min(3),
    username: yup
        .string()
        .required()
        .max(15)
        .min(3),
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .required()
        .max(20)
        .min(6),
    // role_id: yup
    //     .number()
    //     .positive()
    //     .integer()
})

module.exports = {
    registerSchema
}