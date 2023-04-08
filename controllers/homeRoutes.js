const router = require('express').Router();
const withAuth = require('../util/auth');
const { User, Comment, Document, Question } = require('../models');

router.get('/', async (req, res) => {
    try {
        
        console.log(req.session.logged_in)

        res.render('homepage', {
          logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/profile', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Document }, { model: Question }]
    })

    const user = userData.get({ plain: true })

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/create', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('create');
});

module.exports = router;