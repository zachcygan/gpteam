const router = require('express').Router();
const userRoutes = require('./userRoutes');
const questionRoutes = require('./questionRoutes');
const documentRoutes = require('./documentRoutes');
const uploadRoutes = require('./AWSRoutes');


router.use('/users', userRoutes);
router.use('/post', questionRoutes);
router.use('/document', documentRoutes);
router.use('/question', questionRoutes);
router.use('/uploads', uploadRoutes)

module.exports = router;