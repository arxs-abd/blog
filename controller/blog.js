const { Blog } = require("../models/blog")
const fs = require('fs')

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

const viewById = async (req, res) => {
    const allBlog = await Blog.find({
        id_user : req.user.id
    }).catch(err => {
        return res.status(400).send({
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
    const {title, content, thumbnail} = req.body
    const slug = encodeURIComponent(title.toLowerCase())
    const data = {slug, title, content, id_user : req.user.id, thumbnail}

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

const updateBlog = async (req, res) => {
    const idUser = req.user.id
    const { id, title, content, thumbnail } = req.body
    const userBlog = await Blog.findOne({
        _id : id
    })
    
    if (userBlog.id_user !== idUser) return res.status(403).send({
        status : 'error',
        msg : 'Unathorized Author of Blog'
    })

    const slug = encodeURIComponent(title?.toLowerCase())

    userBlog.title = title ?? userBlog.title
    userBlog.content = content ?? userBlog.content
    userBlog.slug = slug ?? userBlog.slug
    userBlog.thumbnail = thumbnail ?? userBlog.thumbnail

    await userBlog.save().catch(err => {
        return res.send({
            status : 'error',
            msg : 'Blog Fail to Update'
        })
    })

    return res.send({
        status : 'successfull',
        msg : 'Blog Has Been Updated'
    })

}

const deleteBlog = async (req, res) => {
    const {id} = req.body
    const idUser = req.user.id
    const blog = await Blog.findOne({
        _id : id
    })

    if (blog.id_user !== idUser) return res.status(403).send({
        status : 'error',
        msg : 'Unathorized Author of Blog'
    })

    await blog.remove().catch(err => {
        return res.send({
            status : 'error',
            msg : 'Blog Fail to Remove'
        })
    })

    return res.send({
        status : 'successfull',
        msg : 'Blog Has Been Deleted'
    })
    
}

module.exports = {
    viewAll,
    viewById,
    addBlog,
    viewBlogBySlug,
    updateBlog,
    deleteBlog
}