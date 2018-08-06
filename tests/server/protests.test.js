const request = require('supertest')
const {expect} = require('chai')
const db = require('../../db'), {Protest, User} = db
const app = require('../../server/start')

const protest = {
  text: 'This is a sample protest',
  color: 'rgb(0,0,0)'
}
const mockProtest = { id: null }

const alice = {
  username: 'alice@secrets.org',
  password: '12345'
}
const agent = request.agent(app)

/* global describe it before afterEach beforeEach */
describe('/api/protests', () => {
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
    .then(() => Protest.create({
      text: protest.text,
      color: protest.color
    }))
    .then((protest) => {
      mockProtest.id = protest.id
    })
  )

  describe('POST /protests (protest)', () => {
    it('creates a protest', () =>
      agent
        .post('/api/protests')
        .send(protest)
        .expect(201)
      )
  })

  describe('GET /protests', () => {
    describe('gets all protests', () =>
      it('responds with a single protest in an array', () =>
        request(app).get('/api/protests')
          .expect(200)
          .then(res => {
            expect(res.body.length).to.eql(1)
          })
      )
    )
  })

  describe('DELETE /protests/:id (protest)', () => {
    it('error message generated when no protest found with matching id', () =>
      request(app)
        .delete('/api/protests/0')
        .expect(400)
        .then(res => expect(res.body.error).to.eql('No protest found with matching id.'))
      )
  })

  describe('DELETE /protests/:id (protest)', () => {
    it('202 when successful', () =>
      request(app)
        .delete(`/api/protests/${mockProtest.id}`)
        .expect(202)
      )
  })
})
