const express = require('express')
const { viewAll, addBlog, viewBlogBySlug } = require('../controller/blog')
const { authenticate } = require('../middleware/auth')
const router = express.Router()

router.get('/api/blog', viewAll)
router.post('/api/blog', authenticate, addBlog)
router.get('/api/blog/:slug', viewBlogBySlug)

module.exports = router