import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import usersService from '../services/users'
import { setUsers } from '../reducers/usersReducer'
import { Table } from 'semantic-ui-react'

const UsersList = props => {
    useEffect(() => {
        const initUsers = async () => {
            const response = await usersService.getAll()
            props.setUsers(response)
        }
        initUsers()
    }, [])

    return (
        <div>
            <h2>Käyttäjät</h2>
            <Table celled>
                <Table.Body>
                    <Table.Row>
                        <Table.HeaderCell>Nimi</Table.HeaderCell>
                        <Table.HeaderCell>Luotuja blogeja</Table.HeaderCell>
                    </Table.Row>
                    {props.users.map(user => {
                        return (
                            <Table.Row key={user.id}>
                                <td>
                                    <Link to={`users/${user.id}`}>{user.name}</Link>
                                </td>
                                <td>{user.blogs.length}</td>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
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
