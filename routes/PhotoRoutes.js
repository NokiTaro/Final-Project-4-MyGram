const router = require('express').Router()
const PhotoController = require('../controllers/PhotoController')
const { authentication } = require('../middleware/auth')

router.post('/', authentication, PhotoController.addPhoto)
router.get('/', PhotoController.getAllPhoto)
router.get('/:id', authentication, PhotoController.getPhotoById)
router.put('/:id', authentication, PhotoController.updatePhoto)
router.delete('/:id', authentication, PhotoController.deletePhotoById)

module.exports = router
