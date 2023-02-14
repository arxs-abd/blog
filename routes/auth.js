const express = require('express')
const { login, register } = require('../controller/auth')
const { loginValidator, registerValidator } = require('../middleware/auth')
const router = express.Router()

router.post('/api/login', loginValidator, login)
router.post('/api/register', registerValidator, register)

module.exports = {
    router
}