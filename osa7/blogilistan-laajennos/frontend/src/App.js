import React, { useEffect } from 'react'
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
import { login, logout } from './reducers/loginReducer'

const App = props => {
    const user = props.loggedUser
    const messageDelay = 5 // in seconds
    const handleLogin = async (event, username, password) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password
            })
            window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user))
            blogService.setToken(user.token)
            props.login(user)
        } catch (exception) {
            props.setNotification('Virheellinen käyttäjänimi tai salasana', messageDelay)
        }
    }

    const handleLogout = async () => {
        window.localStorage.removeItem('loggedBlogsUser')
        blogService.unsetToken()
        props.logout()
    }

    const handleCreate = async (event, blog) => {
        try {
            props.addBlog(blog, user.username)
            props.setNotification(`lisättiin uusi blogi ${blog.title}`, messageDelay)
        } catch (exception) {
            console.log(exception)
            props.setNotification('Blogin lisääminen epäonnistui', messageDelay)
        }
    }

    const handleLike = async blog => {
        try {
            // Change populated field to id only, so that backend can
            // handle it
            blog.userId = blog.userId.id
            props.likeBlog(blog)
            props.setNotification(`Tykkäsit blogia ${blog.title}`, messageDelay)
        } catch (exception) {
            console.log(exception)
            props.setNotification('Tykkäys epäonnistui', messageDelay)
        }
    }

    const handleDelete = async blog => {
        if (window.confirm(`Haluatko varmasti poistaa blogin ${blog.title}`)) {
            try {
                props.removeBlog(blog)
                props.setNotification(`Poistettiin blogi ${blog.title}`, messageDelay)
            } catch (exception) {
                console.log(exception)
                props.setNotification('Positaminen epäonnistui')
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
            blogService.setToken(user.token)
            props.login(user)
        }
    }, [])

    if (user === null || user === undefined) {
        return (
            <div>
                <Notification />
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

const mapStateToProps = ({ blogs, loggedUser }) => {
    return {
        blogs,
        loggedUser
    }
}

const mapDispatchToProps = {
    initializeBlogs,
    addBlog,
    removeBlog,
    likeBlog,
    setNotification,
    login,
    logout
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
