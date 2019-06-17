const mongoose = require('mongoose')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('with one user in database', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({
            username: 'autotest',
            name: 'Auto Test',
            password: '123456'
        })
        await user.save()
    })

    test('creation succeeds', async () => {
        const usersBefore = await User.countDocuments({})

        const newUser = {
            username: 'newuser',
            name: 'New User',
            password: '654321'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfter = await User.countDocuments({})
        expect(usersBefore + 1).toEqual(usersAfter)
    })

    test('fetching users', async () => {
        const res = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(res.body.length).toEqual(1)
    })

    test('adding user with too short name fails', async () => {
        const usersBefore = await User.countDocuments({})
        const shortUsername = {
            username: 'sh',
            name: 'Short Name',
            password: 'verylongpassword'
        }

        await api
            .post('/api/users')
            .send(shortUsername)
            .expect(400)

        const usersAfter = await User.countDocuments({})
        expect(usersBefore).toEqual(usersAfter)
    })

    test('adding user with too short password fails', async () => {
        const usersBefore = await User.countDocuments({})
        const shortPassword = {
            username: 'ihazbadpass',
            name: 'Name',
            password: '12'
        }

        await api
            .post('/api/users')
            .send(shortPassword)
            .expect(400)

        const usersAfter = await User.countDocuments({})
        expect(usersBefore).toEqual(usersAfter)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
