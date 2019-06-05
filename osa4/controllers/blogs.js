const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('userId', { blogs: 0 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findById(body.userId)

    const blog = new Blog({
        author: body.author,
        likes: body.likes,
        title: body.title,
        url: body.url,
        userId: user._id
    })
    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog.toJSON())
    } catch (e) {
        console.log(e)

        response.status(400).json(e)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (error) {
        response.status(404).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {
    try {
        await Blog.findByIdAndUpdate(request.params.id)
        response.status(204).end()
    } catch (error) {
        response.status(404).end()
    }
})

module.exports = blogsRouter
