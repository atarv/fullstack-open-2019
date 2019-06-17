import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

// testi jossa varmistetaan että komponentti renderöi blogin
// otsikon, tekijän ja tykkäysten määänn

const testBlog = {
    title: 'Blog title',
    author: 'Author',
    likes: 3
}

test('render blog\'s content', () => {
    const component = render(<SimpleBlog blog={testBlog} />)

    expect(component.container).toHaveTextContent('Blog title')
})

test('clicking \'like\' works', () => {
    let counter = 0
    const handler = () => {
        counter += 1
    }

    const { getByText } = render(<SimpleBlog onClick={handler} blog={testBlog} />)
    const button = getByText('like')
    for (let i = 0; i < 2; i++) fireEvent.click(button)
    expect(counter).toEqual(2)
})
