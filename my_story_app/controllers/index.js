var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/restricted', function(req, res) {
  if (req.currentUser) {
    res.render('restricted');
  } else {
    req.flash('danger','You do not have permission to see this page');
    res.redirect('/');
  }
});

module.exports = router;