// routes/index.js
const express = require('express');
const userRoutes = require('./UserRoutes');
const socialMediaRoutes = require('./SocialMediaRoutes');
const photoRoutes = require('./PhotoRoutes'); 
const commentRoutes = require('./CommentRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/socialmedias', socialMediaRoutes);
router.use('/photos', photoRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
