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
    let max = -Infinity
    let resultBlog = {}
    blogs.forEach(blog => {
        if (blog.likes > max) {
            max = blog.likes
            resultBlog = blog
        }
    })
    return resultBlog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
