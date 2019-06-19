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
            <h3>Kommentit</h3>
            <ul>
                {blog.comments
                    ? blog.comments.map((comment, i) => <li key={i}>{comment}</li>)
                    : null}
            </ul>
        </div>
    )
}

export default SingleBlog
