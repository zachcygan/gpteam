const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('profile', {
    })
});

module.exports = router; 