const router = require('express').Router();
const userRoutes = require('./userRoutes');
const questionRoutes = require('./questionRoutes');
const documentRoutes = require('./documentRoutes')

router.use('/users', userRoutes);
router.use('/post', questionRoutes);
router.use('/document', documentRoutes)

module.exports = router;