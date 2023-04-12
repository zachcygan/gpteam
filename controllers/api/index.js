const router = require('express').Router();
const userRoutes = require('./userRoutes');
const documentRoutes = require('./documentRoutes');
const uploadRoutes = require('./AWSRoutes');

router.use('/users', userRoutes);
router.use('/document', documentRoutes);
router.use('/uploads', uploadRoutes)

module.exports = router;