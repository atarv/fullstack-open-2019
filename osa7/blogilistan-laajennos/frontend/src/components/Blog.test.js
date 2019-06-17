import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const testBlog = {
    title: 'Blog title',
    author: 'Author',
    likes: 3,
    userId: {
        name: 'test'
    },
    url: 'www.example.com'
}

test('minimized blog shows only title and author', () => {
    const component = render(<Blog blog={testBlog} />)

    expect(component.container).toHaveTextContent('Blog title - Author')
    expect(component.container).not.toHaveTextContent('like')
    expect(component.container).not.toHaveTextContent('test')
})

test('clicking minimized blog reveals full blog entry', () => {
    const component = render(<Blog blog={testBlog} />)
    const title = component.getByText('Blog title - Author')
    const blog = component.container.querySelector('.blog')
    fireEvent.click(title)

    expect(blog).toHaveTextContent('Blog title - Author')
    expect(blog).toHaveTextContent('www.example.com')
    expect(blog).toHaveTextContent('3 likes')
    expect(blog).toHaveTextContent('added by test')
})
