require('../utils/db')
const { User } = require('../models/user')
const bcryptjs = require('bcryptjs')

const login = async (req, res) => {
    const {email, password} = req.body
    return res.send({
        result : req.body
    })
}

const register = async (req, res) => {
    const {email, password} = req.body
    const username = email.split('@')[0]
    const salt = bcryptjs.genSaltSync(10)
    const newPassword = bcryptjs.hashSync(password, salt)

    const data = { username, email, password : newPassword }
    const newUser = new User(data)
    await newUser.save()
    return res.send({
        result : {...data},
    })
}

module.exports = {
    login,
    register
}