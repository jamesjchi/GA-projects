var express = require('express');
var router = express.Router();
var db = require('../models');
var stripe = require("stripe")(
  "sk_test_BQokikJOvBiI2HlWgH4olfQ2"
  );

router.get('/:id', function(req, res) {
  var profileId = req.params.id;
  db.profile.findOne({ 
    where: {
      id: profileId
    }
  }).then(function(profile) {
    // res.send(profile);
    profile.getNeeds().then(function(needs) {
      res.render('person', {profile: profile, needs: needs});
    });    
  });
});

module.exports = router;