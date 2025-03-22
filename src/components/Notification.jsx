import PropTypes from "prop-types"

const Notification = ({ message, type = 'success' }) => {
  if (!message) {
    return null
  }

  const style = {
    color: type === 'success' ? 'green' : 'red',
    fontSize: '16px',
    border: `1px solid ${type === 'success' ? 'green' : 'red'}`,
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  return (
    <div style={style}>
      <p>{message}</p>
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
}

export default Notification