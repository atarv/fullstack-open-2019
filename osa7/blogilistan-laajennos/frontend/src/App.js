import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UsersList from './components/UsersList'
import User from './components/User'
import SingleBlog from './components/SingleBlog'
import { initializeBlogs, addBlog, removeBlog, likeBlog } from './reducers/blogsReducer'
import { setNotification } from './reducers/notificationReducer'
import { login, logout } from './reducers/loginReducer'
import { Container, Header, Menu, Icon, ItemGroup } from 'semantic-ui-react'

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
            props.likeBlog(blog)
            props.setNotification(`Tykkäsit blogia ${blog.title}`, messageDelay)
        } catch (exception) {
            console.log(exception)
            props.setNotification('Tykkäys epäonnistui', messageDelay)
        }
    }

    // const handleDelete = async blog => {
    //     if (window.confirm(`Haluatko varmasti poistaa blogin ${blog.title}`)) {
    //         try {
    //             props.removeBlog(blog)
    //             props.setNotification(`Poistettiin blogi ${blog.title}`, messageDelay)
    //         } catch (exception) {
    //             console.log(exception)
    //             props.setNotification('Poistaminen epäonnistui', messageDelay)
    //         }
    //     }
    // }

    const handleComment = async (comment, blogId) => {
        console.log('comment', comment, blogId) // DEBUG
        try {
            const res = await blogService.createComment(blogId, comment)
            console.log(res) // DEBUG
            props.setNotification(`Lisäsit kommentin blogiin ${res.title}`, messageDelay)
        } catch (error) {
            console.log(error)
            props.setNotification('Kommentin lisääminen epäonnistui', messageDelay)
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
                <Header size="huge" textAlign="center">
                    Kirjautuminen
                </Header>
                <LoginForm handleLogin={handleLogin} />
            </div>
        )
    }

    return (
        <Container>
            <Router>
                <div>
                    <Menu
                    // style={{
                    //     display: 'block',
                    //     backgroundColor: '#DDE0EF',
                    //     padding: '0.4rem'
                    // }}
                    >
                        <Menu.Item>
                            <Link to="/">Blogit</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/users">Käyttäjät</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <span>Kirjautuneena: {user.username}</span>
                        </Menu.Item>
                        <Menu.Item onClick={handleLogout}>
                            <Icon name="log out" />
                            Kirjaudu ulos
                        </Menu.Item>
                    </Menu>
                    <Notification />
                    <Header size="huge" textAlign="center" dividing>
                        Blogi App
                    </Header>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <div>
                                <Header>Luo uusi</Header>
                                <Togglable buttonText="Uusi blogi">
                                    <BlogForm handleCreate={handleCreate} />
                                </Togglable>
                                <ItemGroup link divided>
                                    {props.blogs.map(blog => {
                                        return <Blog key={blog.id} blog={blog} />
                                    })}
                                </ItemGroup>
                            </div>
                        )}
                    />
                    <Route exact path="/users" render={() => <UsersList />} />
                    <Route
                        exact
                        path="/users/:id"
                        render={({ match }) => <User id={match.params.id} />}
                    />
                    <Route
                        exact
                        path="/blogs/:id"
                        render={({ match }) => (
                            <SingleBlog
                                blog={props.blogs.filter(blog => blog.id === match.params.id)[0]}
                                handleLike={handleLike}
                                handleComment={handleComment}
                            />
                        )}
                    />
                </div>
            </Router>
        </Container>
    )
}

const mapStateToProps = ({ blogs, loggedUser, users }) => {
    return {
        blogs,
        loggedUser,
        users
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
