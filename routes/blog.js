const express = require('express')
const { viewAll, addBlog, viewBlogBySlug, updateBlog, deleteBlog } = require('../controller/blog')
const { authenticate } = require('../middleware/auth')
const router = express.Router()
const upload = require('../config/upload')

router.get('/api/blog', viewAll)
router.get('/api/blogById', authenticate,viewAll)
router.post('/api/blog', upload, authenticate, addBlog)
router.get('/api/blog/:slug', viewBlogBySlug)
router.put('/api/blog', upload, authenticate, updateBlog)
router.delete('/api/blog', authenticate, deleteBlog)

module.exports = router