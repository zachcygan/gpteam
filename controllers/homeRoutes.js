const router = require('express').Router();
const withAuth = require('../util/auth');
const { User, Comment, Document} = require('../models');
const session = require('express-session');

//renders hompage handle bars in the main when at this end point
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      logged_in: req.session.logged_in
    })
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