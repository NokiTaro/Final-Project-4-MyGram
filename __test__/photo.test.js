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

const photoData = {
  id: null,
  title: 'this is a photo',
  caption: 'this is a photo caption',
  poster_image_url: 'http://example.com/image.jpg',
}

describe('POST /photos', () => {
  it('should send response with 201 status code', (done) => {
    request(app)
      .post('/photos')
      .set('Authorization', userData.token)
      .send(photoData)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(201)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('title')
        expect(res.body).toHaveProperty('caption')
        expect(res.body).toHaveProperty('poster_image_url')
        photoData.id = res.body.id
        done()
      })
  })
})

describe('GET /photos', () => {
  it('should send response with 200 status code', (done) => {
    request(app)
      .get('/photos')
      .set('Authorization', userData.token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('photos')
        expect(typeof res.body.photos).toEqual('object')
        expect(res.body.photos[0]).toHaveProperty('id')
        done()
      })
  })
})

describe(`PUT /photos/${photoData.id}`, () => {
  it('should send response with 200 status code', (done) => {
    request(app)
      .put(`/photos/${photoData.id}`)
      .set('Authorization', userData.token)
      .send({
        title: `${photoData.title} edit`,
      })
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('photo')
        expect(typeof res.body.photo).toEqual('object')
        expect(res.body.photo).toHaveProperty('title')
        expect(res.body.photo.title).toEqual(`${photoData.title} edit`)
        done()
      })
  })
})

describe(`DELETE /photos/${photoData.id}`, () => {
  it('should send response with 200 status code', (done) => {
    request(app)
      .delete(`/photos/${photoData.id}`)
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
        .bulkDelete('Photos', {})
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
