import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initializeBlogs, addBlog, removeBlog, likeBlog } from './reducers/blogsReducer'
import { setNotification } from './reducers/notificationReducer'

const App = props => {
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
            console.log('handleCreate', blog)

            props.addBlog(blog, user.username)

            setMessage(`lisättiin uusi blogi ${blog.title}`)
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
            // Change populated field to id only, so that backend can
            // handle it
            blog.userId = blog.userId.id
            props.likeBlog(blog)
            props.setNotification(`Tykkäsit blogia ${blog.title}`, 5)
            // setMessage(`Tykkäsit blogia ${blog.title}`)
            // setTimeout(() => setMessage(null), messageDelay)
        } catch (exception) {
            console.log(exception)
            setMessage('Tykkäys epäonnistui')
            setTimeout(() => setMessage(null), messageDelay)
        }
    }

    const handleDelete = async blog => {
        if (window.confirm(`Haluatko varmasti poistaa blogin ${blog.title}`)) {
            try {
                props.removeBlog(blog)
            } catch (exception) {
                console.log(exception)
            }
        }
    }

    // hakee blogit
    useEffect(() => {
        props.initializeBlogs()
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
                <Notification message={message} />
                <h2>Kirjautuminen</h2>
                <LoginForm handleLogin={handleLogin} />
            </div>
        )
    }

    return (
        <div>
            <Notification />
            <h2>Blogit</h2>
            <p>Kirjautuneena: {user.username}</p>
            <button onClick={handleLogout}>Kirjaudu ulos</button>
            <h3>Luo uusi</h3>
            <Togglable buttonText="Uusi blogi">
                <BlogForm handleCreate={handleCreate} />
            </Togglable>
            {props.blogs.map(blog => {
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

const mapStateToProps = ({ blogs }) => {
    return {
        blogs
    }
}

const mapDispatchToProps = {
    initializeBlogs,
    addBlog,
    removeBlog,
    likeBlog,
    setNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
