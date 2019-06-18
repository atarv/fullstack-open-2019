import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import usersService from '../services/users'
import { setUsers } from '../reducers/usersReducer'

const UsersList = props => {
    useEffect(() => {
        const initUsers = async () => {
            const response = await usersService.getAll()
            console.log('users effect', response)
            props.setUsers(response)
        }
        initUsers()
    }, [])

    return (
        <div>
            <h2>Käyttäjät</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Nimi</th>
                        <th>Luotuja blogeja</th>
                    </tr>
                    {props.users.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>
                                    <Link to={`users/${user.id}`}>{user.name}</Link>
                                </td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = ({ users }) => {
    return {
        users
    }
}

const mapDispatchToProps = { setUsers }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersList)
