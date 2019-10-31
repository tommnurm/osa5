import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogService, setBlogs, username }) => {
  const [show, setShow] = useState(false)

  const handleShowChange = async () => {
    await setShow(!show)
  }

  const handleLikeClick = async () => {
    await blogService.update(blog)
    const newBlogs = await blogService.getAll()
    await newBlogs.sort((bl1, bl2) => {
      return bl2.likes - bl1.likes
    })
    setBlogs(newBlogs)
  }

  const handleRemoveClick = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog)
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!show) {
    return (
      <div style={blogStyle} >
        <div onClick={handleShowChange} className="clickableText">
          {blog.title} {blog.author}
        </div>
      </div>
    )
  } else if (blog.user.username !== username) {
    return (
      <div style={blogStyle} >
        <div onClick={handleShowChange}>
          {blog.title} {blog.author}
          <br/>{blog.url}
          <br/>likes {blog.likes} <button onClick={handleLikeClick}>like</button>
          <br/>added by {blog.user.username}
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle} >
        <div onClick={handleShowChange}>
          {blog.title} {blog.author}
          <br/>{blog.url}
          <br/>likes {blog.likes} <button onClick={handleLikeClick}>like</button>
          <br/>added by {blog.user.username}
          <br/><button onClick={handleRemoveClick}>remove</button>
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogService: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

export default Blog