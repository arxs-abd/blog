const express = require('express')
const { viewAll } = require('../controller/blog')
const { authenticate } = require('../middleware/auth')
const router = express.Router()

router.get('/api/blog', authenticate, viewAll)

module.exports = router