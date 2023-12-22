const { Comment, User } = require('../models')

class CommentController {
  static async addComment(req, res) {
    try {
      const userData = req.UserData

      const { comment, PhotoId } = req.body

      const data = await Comment.create({
        comment,
        PhotoId,
        UserId: userData.id,
      })

      res.status(201).json({
        comment: data,
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async getAllComment(req, res) {
    try {
      const data = await Comment.findAll({
        include: User,
      })

      res.status(200).json({
        comments: data,
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async getCommentById(req, res) {
    try {
      const { id } = req.params
      const userData = req.UserData

      const data = await Comment.findOne({
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

  static async updateComment(req, res) {
    try {
      const { comment } = req.body

      const { id } = req.params

      const data = await Comment.update(
        {
          comment,
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
        comment: data[1][0],
      })
    } catch (error) {
      res.status(error.code || 500).json(error.message)
    }
  }

  static async deleteCommentById(req, res) {
    try {
      const { id } = req.params

      const data = await Comment.destroy({
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
        message: 'Your comment has been successfully deleted',
      })
    } catch (error) {
      res.status(error.code || 500).json(error.message)
    }
  }
}

module.exports = CommentController
