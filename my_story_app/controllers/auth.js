var express = require('express');
var db = require('../models');
var router = express.Router();

router.route('/signup')
  .get(function(req, res) {
    res.render('auth/signup');
  })
  .post(function(req, res) {
    if (req.body.password != req.body.password2) {
      req.flash('danger', 'Passwords do not match');
      res.redirect('/auth/signup');
    } else {
      db.user.findOrCreate({
        where: {email: req.body.email},
        defaults: {
          password: req.body.password,
          name: req.body.name
        }
      }).spread(function(user, created) {
        if (created) {
          req.session.user = user.id;
          req.flash('success', 'You are signed up and logged in.')
          res.redirect('/');
        } else {
          req.flash('danger', 'A user with that e-mail address already exists.');
          res.redirect('/auth/signup');
        }
      }).catch(function(err) {
        req.flash('danger','Error');
        res.redirect('/auth/signup');
      });
    }
  });

router.route('/login')
  .get(function(req, res) {
    res.render('auth/login');
  })
  .post(function(req, res) {
    db.user.authenticate(req.body.email, req.body.password, function(err, user) {
      if (err) {
        res.send(err);
      } else if (user) {
        req.session.user = user.id;
        req.flash('success', 'You are logged in.');
        res.redirect('/');
      } else {
        req.flash('danger', 'Invalid username or password');
        res.redirect('/auth/login');
      }
    });
  });

router.get('/logout', function(req, res) {
  req.flash('info','You have been logged out.');
  req.session.user = false;
  res.redirect('/');
});

module.exports = router;