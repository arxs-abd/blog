require('../utils/db')
const { User } = require('../models/user')
const bcryptjs = require('bcryptjs')

const login = async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({
        email
    })
    
    if (!user) return res.status(403).send({
        status : 'error',
        msg : 'Email not Found'
    })

    if (! await bcryptjs.compare(password, user.password)) return res.status(403).send({
        status : 'error',
        msg : 'Password is Wrong'
    })

    return res.send({
        status : 'success',
        msg : 'Login Successfully'
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