const router = require('express').Router();
const withAuth = require('../util/auth');
const { User, Comment, Document, Question } = require('../models');

router.get('/', async (req, res) => {
    try {
        
        

        res.render('homepage', {
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