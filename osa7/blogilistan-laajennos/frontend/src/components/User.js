import React, { useState, useEffect } from 'react'
import usersService from '../services/users'

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
            <h2>{user.name}</h2>
            <h2>Lisätyt blogit</h2>
            <ul>
                {user.blogs
                    ? user.blogs.map(blog => {
                        return <li key={blog.id}>{blog.title}</li>
                    })
                    : null}
            </ul>
        </div>
    )
}

export default User
