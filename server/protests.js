const db = require('APP/db')
const Protest = db.model('protest')

module.exports = require('express').Router()

.get('/', (req, res, next) => {
  Protest.findAll({order: '"likes" DESC'})
  .then((protests) => {
    res.status(200).json(protests)
  })
})

.post('/', (req, res, next) => {
  Protest.create(req.body)
  .then(() => Protest.findAll({
    order: [['updated_at', 'DESC']]
  }))
  .then((protests) => {
    res.status(201).json(protests)
  })
})

.put('/upvote/:id', (req, res, next) => {
  Protest.findOne({
    where: {id: req.params.id}
  })
  .then((protest) => protest.increment(['likes'], {by: 1}))
  .then(() => Protest.findAll({
    order: [['likes', 'DESC']]
  }))
  .then((protests) => {
    res.status(201).json(protests)
  })
})

.put('/downvote/:id', (req, res, next) => {
  Protest.findOne({
    where: {id: req.params.id}
  })
  .then((protest) => protest.decrement(['likes'], {by: 1}))
  .then(() => Protest.findAll({
    order: [['likes', 'DESC']]
  }))
  .then((protests) => {
    res.status(201).json(protests)
  })
})

.delete('/:id', (req, res, next) => {
  Protest.findOne({
    where: {id: req.params.id}
  })
  .then((protest) => protest.destroy())
  .then(() => Protest.findAll({
    order: [['updated_at', 'DESC']]
  }))
  .then((protests) => {
    res.status(202).json(protests)
  })
})
