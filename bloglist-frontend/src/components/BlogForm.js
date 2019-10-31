import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  handleCreate,
  titleField,
  authorField,
  urlField
}) => {
  return (
    <div>
      <h2>add a new blog</h2>
      <form onSubmit={ handleCreate }>
        <p>title: <input type={titleField.type} value={titleField.value} onChange= { titleField.onChange }></input></p>
        <p>author: <input type={authorField.type} value={ authorField.value } onChange= { authorField.onChange }></input></p>
        <p>url: <input type={urlField.type} value={urlField.value} onChange= {urlField.onChange }></input></p>
        <p><button type="submit" onClick={ handleCreate}>create</button></p>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleCreate: PropTypes.func.isRequired,
  titleField: PropTypes.object.isRequired,
  authorField: PropTypes.object.isRequired,
  urlField: PropTypes.object.isRequired
}

export default BlogForm