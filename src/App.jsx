import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState(null)
  const [type, setType] = useState('success')

  const blogFormRef = useRef()

  const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(sortBlogs(blogs));
  }

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setType('error')
      setTimeout(() => {
        setMessage(null)
        setType('success')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const createdBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(createdBlog))
    setMessage('Blog added')
    setType('success')
    setTimeout(() => {
      setMessage(null)
      setType('success')
    }, 5000)
  }

  const handleOnLike = (updatedBlog) => {
    const newBlogs = blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog);
    setBlogs(sortBlogs(newBlogs))
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        handleSubmit={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        username={username}
        password={password}
      />
    </Togglable>  
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>  
  )

  return (
    <div>
      <Notification message={message} type={type} />
      {user === null ? loginForm() :
        <div>
          <button onClick={handleLogout}>logout</button>
          <p>{user.name} logged in</p>
          { blogForm() }
        </div>}
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} onLike={handleOnLike} />
      )}
    </div>
  )
}

export default App