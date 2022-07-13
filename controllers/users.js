const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const {username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password,saltRounds)

  // note that the password is never saved to the database
  const newUser = {
    username,
    name,
    passwordHash
  }
  
  const new_user = await new User(newUser).save()
  response.status(201).json(new_user)
})



module.exports = usersRouter