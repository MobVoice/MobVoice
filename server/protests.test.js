const request = require('supertest')
const {expect} = require('chai')
const db = require('APP/db'), {Protest} = db
const app = require('./start')

const protest = {
  text: 'This is a sample protest',
  color: 'rgb(0,0,0)'
}

/* global describe it before afterEach beforeEach */
describe('/api/protests', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  beforeEach('create a protest', () =>
    Protest.create({
      text: protest.text,
      color: protest.color
    })
  )

  describe('POST /protests (protest)', () => {
    it('succeeds with valid comment and color', () =>
      request(app)
        .post('/api/protests')
        .send(protest)
        .expect(201)
      )
  })

  describe('GET /protests', () => {
    describe('gets all protests', () =>
      it('responds with an empty object', () =>
        request(app).get('/api/protests')
          .expect(200)
          .then(res => expect(res.body.length).to.eql(1))
      ))
  })

  describe('PUT /protests/upvote/:id (protest)', () => {
    it('error message generated when no protest found with matching id', () =>
      request(app)
        .put('/api/protests/upvote/0')
        .expect(400)
        .then(res => expect(res.body.error).to.eql('No protest found with matching id.'))
      )
  })

  describe('PUT /protests/downvote/:id (protest)', () => {
    it('error message generated when no protest found with matching id', () =>
      request(app)
        .put('/api/protests/downvote/0')
        .expect(400)
        .then(res => expect(res.body.error).to.eql('No protest found with matching id.'))
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
})
