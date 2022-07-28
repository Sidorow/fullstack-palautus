import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => {
  const blog = props.blog
  const [blogObject, setBlogObject] = useState(blog)
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const Like = () => {
    const likedBlog =({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes +1,
      user: blog.user.id
    })
    props.likeBlog(likedBlog)
    setBlogObject(likedBlog)
  }

  const Delete = () => {
    props.deleteBlog(blog)
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    likeBlog: PropTypes.func.isRequired
  }

  return (
    <div className='blog'>
      <div>
        <p>{blog.title}: {blog.author} <button onClick={toggleVisibility}>view</button></p>
      </div>
      <div style={showWhenVisible} className='blogView'>
        <p>{blog.url}</p>
        <p>{blog.name}</p>
        <p>likes: {blogObject.likes} <button onClick={Like}>like</button></p>
        <button onClick={Delete}>delete</button>
      </div>
    </div>
  )
}

export default Blog