const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { User } = require('../models/user')

const loginValidator = [
    check('email').isEmail(),
    check('password').isLength({min : 8}).withMessage('Minimum password is 8 character'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) return next()
        return res.status(400).send(errors)
    }
]
const registerValidator = [
    check('email').isEmail().bail().custom( async (value) => {
        const email = await User.find({email : value})
        if (email.length !== 0) throw new Error('Email is Already to Used')
        return true 
    }),
    check('password').isLength({min : 8}).withMessage('Minimum password is 8 character'),
    check('passwordConfirm').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true
    }),
    (req, res, next) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) return next()
        return res.status(400).send(errors)
    }
]

module.exports = {
    loginValidator,
    registerValidator
}