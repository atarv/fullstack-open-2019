const listHelper = require('../utils/list_helper')

test('dummy return one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url:
                'http://ww.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const listWithManyBlogs = [
        {
            _id: '1',
            title: 'Tämä on testiblogi no 1',
            author: 'Testi Käyttäjä',
            url: 'https://www.example.org',
            likes: 1,
            __v: 0
        },
        {
            _id: '2',
            title: 'Tämä on testiblogi no 2',
            author: 'Testi Käyttäjä 2',
            url: 'https://www.example.org',
            likes: 3,
            __v: 0
        }
    ]

    test('when list has only one blog, result is equal to number of that blogs likes', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toEqual(5)
    })

    test('when list contains more than one blog, result is equal to the sum of likes', () => {
        const result = listHelper.totalLikes(listWithManyBlogs)
        expect(result).toEqual(4)
    })

    test('when list is empty, return zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toEqual(0)
    })
})

describe('favoriteBlog', () => {
    const blogs = [
        {
            _id: '1',
            title: 'Tämä on testiblogi no 1',
            author: 'Testi Käyttäjä',
            url: 'https://www.example.org',
            likes: 1,
            __v: 0
        },
        {
            _id: '2',
            title: 'Tämä on testiblogi no 2',
            author: 'Testi Käyttäjä 2',
            url: 'https://www.example.org',
            likes: 3,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url:
                'http://ww.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5AA034580Jatnb',
            title: 'Tämän blogin like-määrä on sama kuin edellisen',
            author: 'Testaaja',
            url: 'www.example.net',
            likes: 5,
            __v: 0
        }
    ]

    test('on non-empty list, return the first blog with most votes', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[2])
    })

    test('on a list with only one element, returns it', () => {
        const result = listHelper.favoriteBlog([blogs[2]])
        expect(result).toEqual(blogs[2])
    })

    test('if list is empty, returns empty object', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual({})
    })
})
