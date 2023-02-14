const { Blog } = require("../models/blog")

const viewAll = async (req, res) => {
    const allBlog = await Blog.find().catch(err => {
        return res.send({
            status : 'error',
            msg : 'Failed Get Blog',
            data : err
        })    
    })
    return res.send({
        status : 'success',
        msg : 'Successfully Get Blog',
        data : allBlog
    })
}

const addBlog = async (req, res) => {
    const {title, content} = req.body
    const slug = title.toLowerCase().split(' ').join('-')
    const data = {slug, title, content, id_user : req.user.id}

    const newBlog = new Blog(data)
    await newBlog.save().catch(err => {
        return res.send({
            status : 'error',
            msg : err
        })
    })

    return res.send({
        status : 'successfully',
        msg : 'Blog Added'
    })
}

const viewBlogBySlug = async (req, res) => {
    const slug = req.params.slug
    const blog = await Blog.findOne({
        slug
    })

    if (!blog) return res.status(404).send({
        status : 'error',
        msg : 'Blog Not Found'
    })

    return res.send({
        result : blog
    })
}

const deleteBlog = (req, res) => {
    const {id} = req.body
    
}

module.exports = {
    viewAll,
    addBlog,
    viewBlogBySlug
}