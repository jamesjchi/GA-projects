var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/profiles', function(req, res) {
  res.render('profiles');
});

module.exports = router;