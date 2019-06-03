const _ = require('lodash')

const dummy = () => {
    return 1
}

const totalLikes = blogs => {
    let total = 0
    for (const blog of blogs) {
        total += blog.likes
    }
    return total
}

const favoriteBlog = blogs => {
    let max = Number.MIN_SAFE_INTEGER
    let resultBlog = {}
    blogs.forEach(blog => {
        if (blog.likes > max) {
            max = blog.likes
            resultBlog = blog
        }
    })
    return resultBlog
}

const mostBlogs = blogs => {
    if (blogs.length === 0) return undefined
    const authorsAndCounts = _.countBy(blogs, 'author')
    const sortedByBlogCount = _.toPairs(authorsAndCounts).sort((a, b) => b[1] - a[1])
    const mostBlogs = sortedByBlogCount[0]
    return { author: mostBlogs[0], blogs: mostBlogs[1] }
}

const mostLikes = blogs => {
    if (blogs.length === 0) return undefined
    let authorsAndLikes = {}
    blogs.forEach(blog => {
        authorsAndLikes[blog.author] = (authorsAndLikes[blog.author] || 0) + blog.likes
    })
    const byLikes = _.toPairs(authorsAndLikes).sort((a, b) => b[1] - a[1])
    const authorWithMostLikes = byLikes[0]
    return { author: authorWithMostLikes[0], likes: authorWithMostLikes[1] }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
