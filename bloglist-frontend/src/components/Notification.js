import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message , confirm }) => {
  if (message === null) {
    return null
  }
  if (confirm) {
    return (
      <div className="confirm">
        {message}
      </div>
    )
  } else {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
}

Notification.propTypes = {
  confirm: PropTypes.bool.isRequired
}

export default Notification