const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Plimplom",
        author: "pimpelipompeli",
        url: "pimpom.com",
        likes: "55000"
    },
    {
        title: "Pingispongis",
        author: "pingos",
        url: "pingpong.com",
        likes: "1255000"
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
  
  module.exports = {
    initialBlogs, blogsInDb
  }