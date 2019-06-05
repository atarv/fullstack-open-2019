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
})

afterAll(() => {
    mongoose.connection.close()
})
