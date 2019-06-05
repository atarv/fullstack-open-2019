const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            password: passwordHash
        })
        const savedUser = await user.save()
        response.json(savedUser)
    } catch (e) {
        response.status(401).send(e)
    }
})

usersRouter.get('/', async (request, response) => {
    try {
        const users = await User.find({})
        response.json(users.map(user => user.toJSON()))
    } catch (error) {
        response.status(500).send(error)
    }
})

module.exports = usersRouter
