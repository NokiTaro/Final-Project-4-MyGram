const { Photo, User } = require('../models')

class PhotoController {
  static async addPhoto(req, res) {
    try {
      const userData = req.UserData

      const { title, caption, poster_image_url } = req.body

      const data = await Photo.create({
        title,
        caption,
        poster_image_url,
        UserId: userData.id,
      })

      res.status(201).json(data)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async getAllPhoto(req, res) {
    try {
      const data = await Photo.findAll({
        include: User,
      })

      res.status(200).json({
        photos: data,
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async getPhotoById(req, res) {
    try {
      const { id } = req.params
      const userData = req.UserData

      const data = await Photo.findOne({
        where: {
          id: id,
          UserId: userData.id,
        },
      })

      if (!data) {
        throw {
          code: 404,
          message: 'Data Not Found',
        }
      }

      res.status(200).json(data)
    } catch (error) {
      res.status(error.code || 500).json(error.message)
    }
  }

  static async updatePhoto(req, res) {
    try {
      const { title, caption, poster_image_url } = req.body

      const { id } = req.params

      const data = await Photo.update(
        {
          title,
          caption,
          poster_image_url,
        },
        {
          where: {
            id: id,
          },
          returning: true,
        }
      )

      if (!data[0]) {
        throw {
          code: 404,
          message: 'Data Not Found',
        }
      }

      res.status(200).json({
        photo: data[1][0],
      })
    } catch (error) {
      res.status(error.code || 500).json(error.message)
    }
  }

  static async deletePhotoById(req, res) {
    try {
      const { id } = req.params

      const data = await Photo.destroy({
        where: {
          id,
        },
      })
      if (!data) {
        throw {
          code: 404,
          message: 'Data Not Found',
        }
      }

      res.status(200).json({
        message: 'Your photo has been successfully deleted'
      })
    } catch (error) {
      res.status(error.code || 500).json(error.message)
    }
  }
}

module.exports = PhotoController
