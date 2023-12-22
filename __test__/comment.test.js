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

const photoData = {
  id: null,
  title: 'this is a photo',
  caption: 'this is a photo caption',
  poster_image_url: 'http://example.com/image.jpg',
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

          request(app)
            .post('/photos')
            .set('Authorization', userData.token)
            .send(photoData)
            .end((err, res) => {
              photoData.id = res.body.id
              done()
            })
        })
    })
})

const commentData = {
  id: null,
  comment: 'this is a comment',
  PhotoId: photoData.id,
}

describe('POST /comments', () => {
  it('should send response with 201 status code', (done) => {
    request(app)
      .post('/comments')
      .set('Authorization', userData.token)
      .send(commentData)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(201)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('comment')
        expect(typeof res.body.comment).toEqual('object')
        expect(res.body.comment).toHaveProperty('id')
        expect(res.body.comment).toHaveProperty('comment')
        commentData.id = res.body.comment.id
        done()
      })
  })
})

describe('GET /comments', () => {
  it('should send response with 200 status code', (done) => {
    request(app)
      .get('/comments')
      .set('Authorization', userData.token)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('comments')
        expect(typeof res.body.comments).toEqual('object')
        expect(res.body.comments[0]).toHaveProperty('id')
        done()
      })
  })
})

describe(`PUT /comments/${commentData.id}`, () => {
  it('should send response with 200 status code', (done) => {
    request(app)
      .put(`/comments/${commentData.id}`)
      .set('Authorization', userData.token)
      .send({
        comment: `${commentData.comment} edit`,
      })
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.status).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('comment')
        expect(typeof res.body.comment).toEqual('object')
        expect(res.body.comment).toHaveProperty('comment')
        expect(res.body.comment.comment).toEqual(`${commentData.comment} edit`)
        done()
      })
  })
})

describe(`DELETE /comments/${commentData.id}`, () => {
  it('should send response with 200 status code', (done) => {
    request(app)
      .delete(`/comments/${commentData.id}`)
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
          sequelize.queryInterface
            .bulkDelete('Comments', {})
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
    .catch((err) => {
      done(err)
    })
})
