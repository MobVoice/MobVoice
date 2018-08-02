const db = require('../db')
const Protest = db.model('protests')
const User = db.model('users')
const Vote = db.model('votes')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()

.get('/', (req, res, next) => {
  Protest.findAll({
    include: {model: Vote}, 
  })
  .then((protests) => {
    res.status(200).json(protests)
  })
})

.post('/', mustBeLoggedIn, (req, res, next) => {
  const user = req.user;
  Protest.create(req.body)
  .then((protest) => {
    return User.findOne({where:{id:user.id}})
    .then((user)=>{
      return protest.setUser(user)
    })
    .then(()=>{
      return Protest.findAll({
        order: [['updated_at', 'DESC']]
      })
    })

  })
  .then((protests) => {
    res.status(201).json(protests)
  })
})

.delete('/:id', (req, res, next) => {
  Protest.findOne({
    where: {id: req.params.id}
  })
  .then((protest) => {
    if (protest) {
      return protest.destroy()
    } else {
      throw new Error('No protest found with matching id.')
    }
  })
  .then((protests) => {
    res.status(202).json(protests)
  })
  .catch((err) => {
    res.status(400).json({error: err.message})
  })
})
