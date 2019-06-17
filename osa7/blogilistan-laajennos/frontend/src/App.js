import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notifier from './components/Notifier'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const messageDelay = 3000

    const handleLogin = async (event, username, password) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password
            })
            window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
        } catch (exception) {
            setMessage('Virheellinen käyttäjänimi tai salasana')
            setTimeout(() => setMessage(null), messageDelay)
        }
    }

    const handleLogout = async () => {
        window.localStorage.removeItem('loggedBlogsUser')
        blogService.unsetToken()
        setUser(null)
    }

    const handleCreate = async (event, blog) => {
        try {
            const response = await blogService.createBlog(blog, user.username)
            console.log(response)

            setMessage(`lisättiin uusi blogi ${response.title}`)
            setTimeout(() => {
                setMessage(null)
            }, messageDelay)
        } catch (exception) {
            console.log(exception)
            setMessage('Blogin lisääminen epäonnistui')
            setTimeout(() => setMessage(null), messageDelay)
        }
    }

    const handleLike = async blog => {
        try {
            const updatedBlog = { ...blog }
            updatedBlog.likes = blog.likes + 1
            updatedBlog.userId = blog.userId.id
            const response = await blogService.updateBlog(updatedBlog)
            if (response.status !== 204) {
                throw new { message: 'Update failed', response }()
            }
            setMessage(`Tykkäsit blogia ${updatedBlog.title}`)
            setTimeout(() => setMessage(null), messageDelay)
        } catch (exception) {
            console.log(exception)
            setMessage('Tykkäys epäonnistui')
            setTimeout(() => setMessage(null), messageDelay)
        }
    }

    const handleDelete = async blog => {
        if (window.confirm(`Haluatko varmasti poistaa blogin ${blog.title}`)) {
            try {
                await blogService.deleteBlog(blog)
            } catch (exception) {
                console.log(exception)
            }
        }
    }

    // hakee blogit
    useEffect(() => {
        blogService.getAll().then(blogs => {
            blogs.sort((a, b) => b.likes - a.likes)
            setBlogs(blogs)
        })
    }, [])

    // hakee mahdollisen jo kirjautuneen käyttäjän tiedot
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    if (user === null) {
        return (
            <div>
                <Notifier message={message} />
                <h2>Kirjautuminen</h2>
                <LoginForm handleLogin={handleLogin} />
            </div>
        )
    }

    return (
        <div>
            <Notifier message={message} />
            <h2>Blogit</h2>
            <p>Kirjautuneena: {user.username}</p>
            <button onClick={handleLogout}>Kirjaudu ulos</button>
            <h3>Luo uusi</h3>
            <Togglable buttonText="Uusi blogi">
                <BlogForm handleCreate={handleCreate} />
            </Togglable>
            {blogs.map(blog => {
                const showRemove = user.name === blog.userId.name
                return (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        handleLike={handleLike}
                        handleDelete={handleDelete}
                        showRemove={showRemove}
                    />
                )
            })}
        </div>
    )
}

export default App
