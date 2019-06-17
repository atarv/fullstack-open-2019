import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete, showRemove }) => {
    const [minimized, setMinimized] = useState(true)
    const toggleMinimize = () => {
        setMinimized(!minimized)
    }
    const blogStyle = {
        border: 'solid',
        borderWidth: 1,
        borderRadius: 4,
        margin: '0.3em'
    }
    const removeButtonStyle = {
        display: showRemove ? '' : 'none'
    }

    if (minimized) {
        return (
            <div style={blogStyle} className="blog">
                <p onClick={() => toggleMinimize(minimized)}>
                    {blog.title} - {blog.author}
                </p>
            </div>
        )
    }

    return (
        <div style={blogStyle} className="blog">
            <p onClick={() => toggleMinimize(minimized)}>
                {blog.title} - {blog.author}
            </p>
            <p>
                <a href={blog.url}>{blog.url}</a>
            </p>
            <p>
                {blog.likes} likes <button onClick={() => handleLike(blog)}>Like</button>
            </p>
            <p>added by {blog.userId.name}</p>
            <button style={removeButtonStyle} onClick={() => handleDelete(blog)}>
                Remove
            </button>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func,
    handleDelete: PropTypes.func,
    handleRemove: PropTypes.func
}

export default Blog
