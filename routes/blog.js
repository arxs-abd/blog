const express = require('express')
const { viewAll, addBlog, viewBlogBySlug, updateBlog, deleteBlog } = require('../controller/blog')
const { authenticate } = require('../middleware/auth')
const router = express.Router()

router.get('/api/blog', viewAll)
router.post('/api/blog', authenticate, addBlog)
router.get('/api/blog/:slug', viewBlogBySlug)
router.put('/api/blog', authenticate, updateBlog)
router.delete('/api/blog', authenticate, deleteBlog)

module.exports = router