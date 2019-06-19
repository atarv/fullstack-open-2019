import React from 'react'
import { useField, omit } from '../hooks'

const LoginForm = props => {
    const username = omit('reset', useField('text'))
    const password = omit('reset', useField('password'))

    return (
        <div>
            <form onSubmit={e => props.handleLogin(e, username.value, password.value)}>
                <label>
                    käyttäjä <input {...username} />
                </label>
                <br />
                <br />
                <label>
                    salasana <input {...password} />
                </label>
                <br />
                <br />
                <button>Kirjaudu sisään</button>
            </form>
        </div>
    )
}

export default LoginForm
