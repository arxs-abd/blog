require('../utils/db')
const { User } = require('../models/user')

const login = async (req, res) => {
    const {email, password} = req.body
    
    return res.send({
        result : req.body
    })
}

const register = async (req, res) => {
    const {email, password} = req.body
    const username = email.split('@')[0]
    const data = { username, email, password }
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