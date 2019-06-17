import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', async () => {
    it('if user has not logged in, no blogs are shown', async () => {
        const component = render(<App />)
        component.rerender(<App />)
        await waitForElement(() => component.getByText('Kirjaudu sisään'))
        expect(component.container).toHaveTextContent('Kirjaudu sisään')
        expect(component.container).not.toHaveTextContent('Go To Statement Considered Harmful')
    })

    it('if logged in, display blogs', async () => {
        const user = {
            username: 'autotest',
            name: 'Auto Test',
            token: '123123'
        }
        localStorage.setItem('loggedBlogsUser', JSON.stringify(user))
        const component = render(<App />)
        component.rerender(<App />)

        await waitForElement(() =>
            component.getByText('Go To Statement Considered Harmful - Edsger W. Dijkstra')
        )
    })
})
