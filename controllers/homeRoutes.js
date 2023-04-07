const router = require('express').Router();
const { Comment, Document, Question, User } = require('../models')

router.get('/', async (req, res) => {
    res.render('homepage', {
    })
})

module.exports = router;