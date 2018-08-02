'use strict'

const {INTEGER, STRING, TEXT} = require('sequelize')

module.exports = db => db.define('protest', {
  text: TEXT,
  color: STRING,
  likes: {
    type: INTEGER,
    defaultValue: 0,
  },
})

module.exports.associations = (Protest, {User, Favorite}) => {
  Protest.belongsTo(User)
}
