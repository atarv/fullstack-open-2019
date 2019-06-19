import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Item } from 'semantic-ui-react'

const Blog = ({ blog }) => {
    // const blogStyle = {
    //     border: 'solid',
    //     borderWidth: 1,
    //     borderRadius: 4,
    //     margin: '0.3em',
    //     padding: '0.5em'
    // }

    return (
        // <div style={blogStyle} className="blog">
        <Item as={Link} name={`blogs/${blog.id}`} to={`blogs/${blog.id}`}>
            <Item.Content>
                <Item.Header>{blog.title}</Item.Header>
                <Item.Meta>{blog.author}</Item.Meta>
            </Item.Content>
            {/* <Link to={`blogs/${blog.id}`}>{`${blog.title} - ${blog.author}`}</Link> */}
        </Item>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired
}

export default Blog
