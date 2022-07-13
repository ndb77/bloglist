const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const new_blog = await new Blog(request.body).save()
  response.status(201).json(new_blog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const deleted_blog = await Blog.deleteOne({_id: request.params.id})
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const updated_blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const update = await Blog.findByIdAndUpdate({_id: request.params.id},updated_blog,{ new: true })
  response.json(update)
})


module.exports = blogsRouter