const db = require('../db')
const Protest = db.model('protests')
const User = db.model('users')
const Vote = db.model('votes')

module.exports = require('express').Router()

.post('/', (req, res, next) => {
  const {dir, pid, sm} = req.query
  const user = req.user

  Vote.findOne({where: {pid, sm, user_id: req.user.id, protest_id: pid}})
  .then((vote) => {
    if (!vote) {
      return Vote.create({dir, pid, sm, user_id: req.user.id, protest_id: pid})
    } else {
      vote.dir = dir
      return vote.save()
    }
  })
  .then(() => {
    res.sendStatus(204)
  })
  .catch((err) => {
    res.status(400).json(err)
  })
})
