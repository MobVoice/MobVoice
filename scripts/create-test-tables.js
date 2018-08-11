'use strict'
var args = require('../config')
var db = require('../db')

db.query('CREATE TABLE MOBVOICE_TEST')
.then(() => {
  console.log('CREATE TABLE')
})
.catch((err) => {
  console.log('table was not created', err)
})
