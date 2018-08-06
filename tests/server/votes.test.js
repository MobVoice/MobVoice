const request = require('supertest')
const {expect} = require('chai')
const db = require('../../db'), {Protest, Vote, User} = db
const app = require('../../server/start')

const protest = {
  text: 'This is a sample protest',
  color: 'rgb(0,0,0)'
}

const alice = {
  username: 'alice@secrets.org',
  password: '12345'
}
let pid = 0

const mockProtest = { id: null }
const agent = request.agent(app)
/* global describe it before afterEach beforeEach */
describe('/api/votes', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))
  beforeEach('create a user, login, create protest', () =>
    User.create({
      email: alice.username,
      password: alice.password
    })
    .then(() => agent
        .post('/api/auth/login/local')
        .send(alice))
    .then(() => Protest.create(protest))
    .then((protest) => {
      pid=protest.id
    })
  )

  describe('POST /votes (votes)', () => {
    it('204 when successful', () =>
      agent
        .post(`/api/votes?dir=1&pid=${pid}&sm='test sm'`)
        .expect(204)
      )
  })
})
