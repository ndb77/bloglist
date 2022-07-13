const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'String',
    author: 'String',
    url: 'String',
    likes: 10
  },
  {
    title: 'String2',
    author: 'String2',
    url: 'String2',
    likes: 15
  }
]

const nonExistingId = async () => {
  // creates and destroys a blog and keeps the _id
  // this is to ensure that the id generated is valid, but non-existing
  const blog = new Blog({ 
    title: 'String3',
    author: 'String3',
    url: 'String23',
    likes: 20
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}