const db = require('../db')
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
  .then((protest) => {
    if (protest) {
      return protest.increment(['likes'], {by: 1})
    } else {
      throw new Error('No protest found with matching id.')
    }
  })
  .then(() => Protest.findAll({
    order: [['updated_at', 'DESC']]
  }))
  .then((protests) => {
    res.status(200).json(protests)
  })
  .catch((err) => {
    res.status(400).json({error: err.message})
  })
})

.put('/downvote/:id', (req, res, next) => {
  Protest.findOne({
    where: {id: req.params.id}
  })
  .then((protest) => {
    if (protest) {
      return protest.decrement(['likes'], {by: 1})
    } else {
      throw new Error('No protest found with matching id.')
    }
  })
  .then(() => Protest.findAll({
    order: [['updated_at', 'DESC']]
  }))
  .then((protests) => {
    res.status(200).json(protests)
  })
  .catch((err) => {
    res.status(400).json({error: err.message})
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
