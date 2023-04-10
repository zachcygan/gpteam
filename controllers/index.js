const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const chatBot = require('./chatBot')
const profileRoutes = require('./profileRoutes');
const postpageRoutes = require('./postpageRoutes');

router.use('/', homeRoutes);
router.use('/openAI', chatBot);
router.use('/profile', profileRoutes);
router.use('/api', apiRoutes);
router.use('/post', postpageRoutes)

module.exports = router;