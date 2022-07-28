import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type='info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const notifyError = (message, type='alert') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    await blogService.create(blogObject)
    blogs.concat(blogObject)
    notify('New blog ' + blogObject.title + ' added!')
  }

  const likeBlog = async (blogObject) => {
    const likedBlog = await blogService.update(blogObject.id, blogObject)
    setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog: likedBlog))
    notify('You liked ' + likedBlog.title + '!')
  }

  const deleteBlog = async (blogObject) => {
    if (window.confirm('Delete ' + blogObject.title + '?')) {
      await blogService.remove(blogObject.id)
    } else {
      return
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notify('Logged in!')
    } catch (exception) {
      notifyError('Wrong username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const logoutButton = () => (
    <form onSubmit={handleLogout()}>
      <div>
        <button
          type="submit">logout
        </button>
      </div>
    </form>
  )

  const sortLikes = (a, b) => b.likes - a.likes

  const blogFormRef = useRef()

  return (
    <div>
      <Notification notification={notification} />

      {user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>:
        <div>
          {user.name} logged in {logoutButton()}
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.sort(sortLikes).map(blog =>
            <Blog
              likeBlog={likeBlog}
              deleteBlog={deleteBlog}
              key={blog.id}
              blog={blog} />)}
        </div>
      }
    </div>
  )
}

export default App
