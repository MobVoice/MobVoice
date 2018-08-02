'use strict'

const {INTEGER, STRING, TEXT} = require('sequelize')

module.exports = db => db.define('protests', {
  text: TEXT,
  color: STRING,
})

module.exports.associations = (Protest, {User, Vote}) => {
  Protest.belongsTo(User)
  Protest.hasMany(Vote)
}
