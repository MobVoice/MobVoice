'use strict'
const args = require('../config')
const db = require('../db')

db.query('CREATE TABLE MOBVOICE_TEST')
.then(() => {
  console.log('CREATE TABLE')
})
.catch((err) => {
  console.log('table was not created', err)
})
