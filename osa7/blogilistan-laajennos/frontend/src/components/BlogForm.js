import React from 'react'
import { useField, omit } from '../hooks'

const BlogForm = props => {
    const title = omit('reset', useField('text'))
    const author = omit('reset', useField('text'))
    const url = omit('reset', useField('text'))

    return (
        <div>
            <label>
                Otsikko
                <input {...title} />
            </label>
            <br />
            <label>
                Tekijä
                <input {...author} />
            </label>
            <br />
            <label>
                URL
                <input {...url} />
            </label>
            <br />
            <button
                onClick={e =>
                    props.handleCreate(e, {
                        title: title.value,
                        author: author.value,
                        url: url.value
                    })
                }
            >
                Luo
            </button>
        </div>
    )
}

export default BlogForm
