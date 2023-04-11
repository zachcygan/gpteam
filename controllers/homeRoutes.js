const router = require('express').Router();
const withAuth = require('../util/auth');
const { User, Comment, Document, Question } = require('../models');
const session = require('express-session');

router.get('/', async (req, res) => {
  try {


    res.render('homepage', {
      
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'], include: ['bio'] },
      include: [{ model: Document }, { model: Question }]
    })

    const user = userData.get({ plain: true })

    res.render('profile', {
      user,
      logged_in: true,
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

  if (req.session.errorMessage !== null) {
    res.render('login', {
      errorMessage: req.session.errorMessage
    });
  } else {
    res.render('login', {
      errorMessage: null
    })
  }
  
  req.session.errorMessage = null;

  
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