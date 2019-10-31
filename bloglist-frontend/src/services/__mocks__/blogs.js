const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'test blog 1',
    author: 'Writer McWriterson',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'testuser',
      name: 'Testi Testinen'
    },
    url: 'testblog1.com',
    likes: 0
  },
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'test blog 2',
    author: 'Author, son of Author',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'testuser',
      name: 'Testi Testinen'
    },
    url: 'logicblog.com',
    likes: 3
  },
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'test blog 3',
    author: 'kurt gödel',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'testuser',
      name: 'Testi Testinen'
    },
    url: 'logicblog.com',
    likes: 2
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }