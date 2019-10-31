import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async blog => {
  let blogs = await getAll()
  const blogToUpdate = blogs.find(bl => bl.title === blog.title)
  const id = blogToUpdate.id
  const user = blogToUpdate.user.id

  const url = `${baseUrl}/${id}`

  const updatedBlog = {
    user: user,
    likes: blog.likes+1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }

  const config = {
    headers: { Authorization: token }
  }
  await axios.put(url, updatedBlog, config)
}

const remove = async blog => {
  let blogs = await getAll()
  const blogToDelete = blogs.find(bl => bl.title === blog.title)
  const id = blogToDelete.id

  const config = {
    headers: { Authorization: token }
  }

  const url = `${baseUrl}/${id}`
  await axios.delete(url, config)
}

export default { getAll, create, setToken, update, remove }