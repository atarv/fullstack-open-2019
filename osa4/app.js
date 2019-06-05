const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const cors = require('cors')
const middleware = require('./utils/middleware')

const mongoUrl = config.mongoUrl

mongoose.connect(mongoUrl, { useNewUrlParser: true })

app.use(cors())
app.use(middleware.getTokenFrom)
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app
