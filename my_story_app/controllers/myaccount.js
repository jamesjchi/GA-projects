var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/myaccount', function(req, res) {
  res.render('myaccount');
});

module.exports = router;