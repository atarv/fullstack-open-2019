import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
    // const [minimized, setMinimized] = useState(true)
    // const toggleMinimize = () => {
    //     setMinimized(!minimized)
    // }
    const blogStyle = {
        border: 'solid',
        borderWidth: 1,
        borderRadius: 4,
        margin: '0.3em',
        padding: '0.5em'
    }

    return (
        <div style={blogStyle} className="blog">
            <Link to={`blogs/${blog.id}`}>{`${blog.title} - ${blog.author}`}</Link>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired
}

export default Blog
