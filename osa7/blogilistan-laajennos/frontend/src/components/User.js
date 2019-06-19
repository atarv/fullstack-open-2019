import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import usersService from '../services/users'
import { List, Header, Icon } from 'semantic-ui-react'

const User = ({ id }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getUser = async () => {
            setUser(await usersService.getById(id))
        }
        getUser()
    }, [])

    if (user === null) return <div></div>

    return (
        <div>
            <Header>
                <Icon name="user" />
                {user.name}
            </Header>
            <Header>Lisätyt blogit</Header>
            <List bulleted={true} divided size="large">
                {user.blogs
                    ? user.blogs.map(blog => {
                        return (
                            <List.Item key={blog.id}>
                                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                            </List.Item>
                        )
                    })
                    : null}
            </List>
        </div>
    )
}

export default User
