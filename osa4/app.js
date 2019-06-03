const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const cors = require('cors')

const mongoUrl = config.mongoUrl

mongoose.connect(mongoUrl, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

module.exports = app
