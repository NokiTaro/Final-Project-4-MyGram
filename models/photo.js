'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Photo.belongsTo(models.User, { foreignKey: 'UserId' })
    }
  }
  Photo.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            message: 'Required',
          },
        },
      },
      caption: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            message: 'Required',
          },
        },
      },
      poster_image_url: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            message: 'Required',
          },
        },
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Photo',
    }
  )
  return Photo
}
