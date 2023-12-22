const router = require("express").Router()
const SocialMediaController = require("../controllers/SocialMediaController")
const { authentication } = require("../middleware/auth")

router.post("/", authentication, SocialMediaController.addSocialMedia)
router.get("/", SocialMediaController.getAllSocialMedia)
router.get("/:id", authentication, SocialMediaController.getSocialMediaById)
router.put("/:id", authentication, SocialMediaController.updateSocialMedia)
router.delete("/:id", authentication, SocialMediaController.deleteSocialMediaById)

module.exports = router
