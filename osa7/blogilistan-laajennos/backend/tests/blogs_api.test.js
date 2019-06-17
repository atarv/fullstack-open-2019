const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        _id: '5a425aa71b54a676234d17f8',
        title: 'Tämä on testiblogi no 1',
        author: 'Testi Käyttäjä',
        url: 'https://www.example.org',
        likes: 1,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676237d18f8',
        title: 'Tämä on testiblogi no 2',
        author: 'Testi Käyttäjä',
        url: 'https://www.example.org',
        likes: 3,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://ww.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f9',
        title: 'Tämän blogin like-määrä on sama kuin edellisen',
        author: 'Testaaja',
        url: 'www.example.net',
        likes: 5,
        __v: 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    const promises = initialBlogs.map(blog => new Blog(blog)).map(blogObj => blogObj.save())
    await Promise.all(promises)
})

test('all initial notes are returned', async () => {
    const res = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(res.body.length).toEqual(initialBlogs.length)
})

test('blogs have an id', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body[0].id).toBeDefined()
})

test('blogs can be added', async () => {
    const blog = {
        author: 'Automated Tester',
        title: 'Automated test',
        url: 'www.example.com',
        likes: 10
    }
    const res = await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
    expect(res.body.id).toBeDefined()
    // check blog count
    expect(await Blog.countDocuments({})).toEqual(initialBlogs.length + 1)
})

test('if likes is not defined, set it to zero', async () => {
    const blogWithNoLikes = {
        author: 'Automated Tester',
        title: 'Unliked Blog Post',
        url: 'www.example.org'
    }
    const res = await api
        .post('/api/blogs')
        .send(blogWithNoLikes)
        .expect(201)
    expect(res.body.id).toBeDefined()
})

test('if blog does not contain title or url, return bad request', async () => {
    const noUrl = {
        author: 'Automated Tester',
        title: 'This post has no URL',
        likes: 9000
    }
    await api
        .post('/api/blogs')
        .send(noUrl)
        .expect(400)

    const noTitle = {
        author: 'Automated Tester',
        url: 'www.example.com'
    }
    await api
        .post('/api/blogs')
        .send(noTitle)
        .expect(400)
})

test('blogs can be deleted', async () => {
    const deleteId = initialBlogs[0]._id
    await api.delete('/api/blogs/' + deleteId).expect(204)
    const res = await api.get('/api/blogs')
    expect(res.body.length).toEqual(initialBlogs.length - 1)
})

test('non-existant deletes return 404', async () => {
    await api.delete('/api/blogs/asdf').expect(404)
})

afterAll(() => {
    mongoose.connection.close()
})
