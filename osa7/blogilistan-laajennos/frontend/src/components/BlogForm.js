import React from 'react'
import { useField, omit } from '../hooks'
import { Input, Button, Icon } from 'semantic-ui-react'

const BlogForm = props => {
    const title = omit('reset', useField('text'))
    const author = omit('reset', useField('text'))
    const url = omit('reset', useField('text'))

    const inputStyle = {
        marginBottom: '0.5em'
    }

    return (
        <div style={{ margin: '1em' }}>
            <Input label="Otsikko" {...title} style={inputStyle} />
            <br />
            <Input label="Tekijä" {...author} style={inputStyle} />
            <br />
            <Input label="URL" {...url} style={inputStyle} />
            <br />
            <Button
                animated
                basic
                color="grey"
                onClick={e =>
                    props.handleCreate(e, {
                        title: title.value,
                        author: author.value,
                        url: url.value
                    })
                }
            >
                <Button.Content visible>
                    <Icon name="arrow right" />
                </Button.Content>
                <Button.Content hidden>Luo</Button.Content>
            </Button>
        </div>
    )
}

export default BlogForm
