const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    try {
        const res = await blog.save()
        // console.log(res.hasWriteError(), res.writeError)

        // if (res.hasWriteError()) throw res.writeError
        response.status(201).json(res)
    } catch (e) {
        response.status(400).end()
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
