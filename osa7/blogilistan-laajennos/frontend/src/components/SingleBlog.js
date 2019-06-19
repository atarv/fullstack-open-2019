import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Header, Button, Input, List, Card, Icon, Form } from 'semantic-ui-react'

const SingleBlog = props => {
    const [comment, setComment] = useState('')
    const blog = props.blog

    useEffect(() => {}, [])
    if (!blog) return <div></div>
    return (
        <div>
            <Card>
                <Card.Content>
                    <Card.Header>{blog.title}</Card.Header>
                    <Card.Meta>
                        <a href={blog.url}>{blog.url}</a>
                    </Card.Meta>
                    <Card.Content>
                        - {blog.author}
                        <br />
                        <Button icon onClick={() => props.handleLike(blog)} floated="right">
                            <Icon name="like" />
                        </Button>
                    </Card.Content>
                </Card.Content>
                <Card.Content extra textAlign="right">
                    Lisäsi käyttäjä:
                    <Link to={`/users/${blog.userId.id}`}>{blog.userId.username}</Link>
                </Card.Content>
            </Card>
            <h3>Kommentit</h3>
            <Form onSubmit={() => props.handleComment(comment, blog.id)}>
                <Form.Field>
                    <input type="text" name="comment" onChange={e => setComment(e.target.value)} />
                    <Button type="submit" style={{ marginTop: '0.7em' }}>
                        Lisää kommentti
                    </Button>
                </Form.Field>
            </Form>
            <List>
                {blog.comments
                    ? blog.comments.map((comment, i) => (
                        <List.Item key={i}>
                            <Icon name="comment outline" />
                            <List.Content>{comment}</List.Content>
                        </List.Item>
                    ))
                    : null}
            </List>
        </div>
    )
}

export default SingleBlog
