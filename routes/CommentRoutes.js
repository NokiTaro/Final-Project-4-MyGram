const router = require('express').Router()
const CommentController = require('../controllers/CommentController')
const { authentication } = require('../middleware/auth')

router.post('/', authentication, CommentController.addComment)
router.get('/', CommentController.getAllComment)
router.get('/:id', authentication, CommentController.getCommentById)
router.put('/:id', authentication, CommentController.updateComment)
router.delete('/:id', authentication, CommentController.deleteCommentById)

module.exports = router
