import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        {'Title: '}
          <input
            type="text"
            placeholder='write title blog here'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            data-testid="title"
          />
        </div>
        <div>
          {'Author: '}
          <input
            type="text"
            placeholder='write author blog here'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            data-testid="author"
          />
        </div>
        <div>
          {'URL: '}
          <input
            type="text"
            placeholder='write URL blog here'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            data-testid="url"
          />
        </div>
        <button type="submit">save</button>
      </form>
  )
}

BlogForm.displayName = 'BlogForm'
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}


export default BlogForm
