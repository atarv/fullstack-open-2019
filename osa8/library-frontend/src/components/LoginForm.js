import React, { useState } from 'react'

const LoginForm = props => {
    if (!props.show) return null
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async event => {
        event.preventDefault()
        try {
            const result = await props.login({
                variables: {
                    username,
                    password
                }
            })
            const token = result.data.login.value
            props.setToken(token)
            localStorage.setItem('book-app-user-token', token)
            setUsername('')
            setPassword('')
        } catch (error) {
            props.handleError(error)
            setUsername('')
            setPassword('')
        }
    }

    return (
        <div>
            <label>Username</label>
            <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
            />
            <br />
            <label>Password</label>
            <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
            />
            <br />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default LoginForm
