import React, { useEffect } from 'react'

const SingleBlog = props => {
    const blog = props.blog

    useEffect(() => {}, [])
    if (!blog) return <div></div>
    return (
        <div>
            <h2>{blog.title}</h2>
            <div>
                <a href={blog.url}>{blog.url}</a>
            </div>
            <div>
                Tykkäyksiä {blog.likes}
                <button onClick={() => props.handleLike(blog)}>Tykkää</button>
            </div>
            <div>Lisäsi käyttäjä {blog.userId.name}</div>
        </div>
    )
}

export default SingleBlog
