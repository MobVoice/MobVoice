'use strict'

const {INTEGER, STRING, TEXT, ENUM} = require('sequelize')

module.exports = db => db.define('votes', {
  dir: INTEGER,
  pid: STRING,
})

module.exports.associations = (Vote, {Protest, User}) => {
  Vote.belongsTo(Protest)
  Vote.belongsTo(User)
}
