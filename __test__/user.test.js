const request = require('supertest')
const app = require('./app')
const { sequelize } = require('../models')
const { verifyToken } = require('../utils/jwt')

const userData = {
  id: null,
  username: 'user_tes',
  email: 'user@tes.com',
  password: 'qwe123',
  token: null,
}

describe('POST /users/register', () => {
  it('should send response with 201 status code', (done) => {
    request(app)
      .post('/users/register')
      .send(userData)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(201)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('username')
        expect(res.body).toHaveProperty('email')
        expect(res.body.username).toEqual(userData.username)
        expect(res.body.email).toEqual(userData.email)
        userData.id = res.body.id
        done()
      })
  })
})

describe('POST /users/login', () => {
  it('should send response with 200 status code', (done) => {
    request(app)
      .post('/users/login')
      .send(userData)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('token')
        expect(typeof res.body.token).toEqual('string')
        expect(verifyToken(res.body.token).email).toEqual(userData.email)
        userData.token = res.body.token
        done()
      })
  })
})

describe(`PUT /users/${userData.id}`, () => {
  it('should send response with 200 status code', (done) => {
    request(app)
      .put(`/users/${userData.id}`)
      .set('Authorization', userData.token)
      .send(userData)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(typeof res.body.user).toEqual('object')
        expect(res.body.user).toHaveProperty('username')
        expect(res.body.user).toHaveProperty('email')
        done()
      })
  })
})

describe(`DELETE /users/${userData.id}`, () => {
  it('should send response with 200 status code', (done) => {
    request(app)
      .delete(`/users/${userData.id}`)
      .set('Authorization', userData.token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(typeof res.body.message).toEqual('string')
        done()
      })
  })
})

afterAll((done) => {
  sequelize.queryInterface
    .bulkDelete('Users', {})
    .then(() => {
      return done()
    })
    .catch((err) => {
      done(err)
    })
})
