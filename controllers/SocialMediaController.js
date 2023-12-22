const {
    SocialMedia,
    User
} = require("../models")


class SocialMediaController {

    static async addSocialMedia(req, res) {
        try {

            const userData = req.UserData

            const {
                name,
                social_media_url
            } = req.body

            const data = await SocialMedia.create({
                name,
                social_media_url,   
                UserId: userData.id
            })

            res.status(201).json({
                social_media: data
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async getAllSocialMedia(req, res) {
        try {

            const data = await SocialMedia.findAll({
                include: User
            })

            res.status(200).json({
                social_medias: data
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async getSocialMediaById(req, res) {
        try {
            const { id } = req.params
            const userData = req.UserData

            const data = await SocialMedia.findOne({
                where: {
                    id: id,
                    UserId: userData.id
                }
            })

            if(!data) {
                throw {
                    code: 404,
                    message: "Data Not Found"
                }
            }

            res.status(200).json(data)
        } catch (error) {
            res.status(error.code || 500).json(error.message)
        }
    }

    static async updateSocialMedia(req, res) {
        try {
            const {
                name,
                social_media_url,
            } = req.body

            const { id } = req.params

            const data = await SocialMedia.update({
                name,
                social_media_url,
            }, {
                where: {
                    id: id
                },
                returning: true
            })

            if (!data[0]) {
                throw{
                    code: 404,
                    message: "Data Not Found"
                }
            }

            res.status(200).json({
                social_media: data[1][0]
            })
        } catch (error) {
            res.status(error.code || 500).json(error.message)
        }
    }

    static async deleteSocialMediaById(req, res){
        try {
            const { id } = req.params

            const data = await SocialMedia.destroy({
                where: {
                    id
                }
            })
            if (!data) {
                throw{
                    code: 404,
                    message: "Data Not Found"
                }
            }

            res.status(200).json({
                message: "Your social media has ben successfully deleted"
            })
        } catch (error) {
            res.status(error.code || 500).json(error.message)
        }
    }
}

module.exports = SocialMediaController