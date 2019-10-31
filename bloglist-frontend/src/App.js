import React, { useState, useEffect } from 'react'
import './App.css'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import  { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [isConfirm, setIsConfirm] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const userField = useField('text')
  const passwordField = useField('password')
  const titleField = useField('text')
  const authorField = useField('text')
  const urlField = useField('text')

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = {
        title: titleField.value,
        author: authorField.value,
        url: urlField.value,
        user: user.username,
        likes: 0
      }
      await blogService.create(newBlog)
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
      setIsConfirm(true)
      setMessage(`${titleField.value} by ${authorField.value} added!`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setIsConfirm(false)
      setMessage('Could not create new blog')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
    titleField.reset()
    authorField.reset()
    urlField.reset()
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = userField.value
    const password = passwordField.value
    try {
      const loggedUser = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggedUser)
      )
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
    } catch (exception) {
      setIsConfirm(false)
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
    userField.reset()
    passwordField.reset()
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  const blogFormRef = React.createRef()
  const currentUserJSON = window.localStorage.getItem('loggedBlogappUser')

  if (!currentUserJSON) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} confirm={isConfirm} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type={userField.type}
              value={userField.value}
              onChange= {userField.onChange}
            />
          </div>
          <div>
            password
            <input
              type={passwordField.type}
              value={passwordField.value}
              onChange= {passwordField.onChange }
            />
          </div>
          <button type="submit" onClick={ handleLogin }>login</button>
        </form>
      </div>
    )
  } else {
    const currentUser = JSON.parse(currentUserJSON)
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message} confirm={isConfirm} />
        <p>{currentUser.name} logged in! <button onClick={ handleLogout }>logout</button></p>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm
            handleCreate={handleCreate}
            titleField={titleField}
            authorField={authorField}
            urlField={urlField}
          />
        </Togglable>
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} blogService={blogService} setBlogs={setBlogs} username={currentUser.username}/>
          )}
        </div>
      </div>
    )
  }
}

export default App
