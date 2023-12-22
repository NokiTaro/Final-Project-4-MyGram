const request = require('supertest')
const app = require('./app')
const { sequelize } = require('../models')

const userData = {
  id: null,
  username: 'user_tes',
  email: 'user@tes.com',
  password: 'qwe123',
  token: null,
}

beforeAll((done) => {
  request(app)
    .post('/users/register')
    .send(userData)
    .end((err, res) => {
      userData.id = res.body.id

      request(app)
        .post('/users/login')
        .send(userData)
        .end((err, res) => {
          userData.token = res.body.token
          done()
        })
    })
})

const socialMediaData = {
  id: null,
  name: 'gans123',
  social_media_url: 'http://example.com/gans123',
}

describe('POST /socialmedias', () => {
  it('should send response with 201 status code', (done) => {
    request(app)
      .post('/socialmedias')
      .set('Authorization', userData.token)
      .send(socialMediaData)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(201)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('social_media')
        expect(typeof res.body.social_media).toEqual('object')
        expect(res.body.social_media).toHaveProperty('id')
        socialMediaData.id = res.body.social_media.id
        done()
      })
  })
})

describe('GET /socialmedias', () => {
  it('should send response with 200 status code', (done) => {
    request(app)
      .get('/socialmedias')
      .set('Authorization', userData.token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('social_medias')
        expect(typeof res.body.social_medias).toEqual('object')
        expect(res.body.social_medias[0]).toHaveProperty('id')
        done()
      })
  })
})

describe(`PUT /socialmedias/${socialMediaData.id}`, () => {
  it('should send response with 200 status code', (done) => {
    request(app)
      .put(`/socialmedias/${socialMediaData.id}`)
      .set('Authorization', userData.token)
      .send({
        name: `${socialMediaData.name} edit`,
      })
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('social_media')
        expect(typeof res.body.social_media).toEqual('object')
        expect(res.body.social_media).toHaveProperty('name')
        expect(res.body.social_media.name).toEqual(`${socialMediaData.name} edit`)
        done()
      })
  })
})

describe(`DELETE /socialmedias/${socialMediaData.id}`, () => {
  it('should send response with 200 status code', (done) => {
    request(app)
      .delete(`/socialmedias/${socialMediaData.id}`)
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
      sequelize.queryInterface
        .bulkDelete('SocialMedia', {})
        .then(() => {
          return done()
        })
        .catch((err) => {
          done(err)
        })
    })
    .catch((err) => {
      done(err)
    })
})
