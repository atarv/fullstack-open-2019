import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('book-app-user-token')
    return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : null
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloHooksProvider client={client}>
        <App />
    </ApolloHooksProvider>,
    document.getElementById('root')
)
