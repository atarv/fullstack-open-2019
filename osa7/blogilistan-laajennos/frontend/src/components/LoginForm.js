import React from 'react'
import { useField, omit } from '../hooks'
import { Container, Form, Button } from 'semantic-ui-react'

const LoginForm = props => {
    const username = omit('reset', useField('text'))
    const password = omit('reset', useField('password'))

    return (
        <Container>
            <Form onSubmit={e => props.handleLogin(e, username.value, password.value)}>
                <Form.Field>
                    <label>
                        käyttäjä <input {...username} />
                    </label>
                    {/* <br /> */}
                </Form.Field>
                <br />
                <label>
                    salasana <input {...password} />
                </label>
                <br />
                <br />
                <Button fluid={true} primary={true}>
                    Kirjaudu sisään
                </Button>
            </Form>
        </Container>
    )
}

export default LoginForm
