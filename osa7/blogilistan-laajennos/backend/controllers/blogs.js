const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('userId', { blogs: 0 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog.toJSON())
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findOne({ username: body.username })

        const blog = new Blog({
            author: body.author,
            likes: body.likes,
            title: body.title,
            url: body.url,
            userId: user._id
        })
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
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    try {
        const toBeDeletedBlog = await Blog.findById(request.params.id)
        if (toBeDeletedBlog.userId.toString() === decodedToken.id.toString()) {
            await Blog.deleteOne(toBeDeletedBlog)
            response.status(204).end()
        } else {
            response.status(401).json({ error: 'token invalid or missing' })
        }
    } catch (error) {
        console.log(error)
        response.status(404).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    body.userId = body.userId.id
    try {
        await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
        response.status(204).end()
    } catch (error) {
        console.log(error)
        response.status(404).end()
    }
})

blogsRouter.post('/:id/comments', async (request, response) => {
    const body = request.body
    try {
        if (!body.comment) throw { error: 'Empty comments are not allowed' }
        const updatedBlog = await Blog.findByIdAndUpdate(
            request.params.id,
            {
                $push: { comments: body.comment }
            },
            { new: true }
        )
        response.status(201).json(updatedBlog)
    } catch (error) {
        console.log(error)
        response.status(500).end()
    }
})

module.exports = blogsRouter
