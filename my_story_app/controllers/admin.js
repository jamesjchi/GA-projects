var express = require('express');
var router = express.Router();
var db = require('../models');

// render main page
router.get('/', function(req, res) {

  db.profile.findAll({order: ['firstname']}).then(function(profiles) {
    res.render('admin', {profiles: profiles});

    }); 
});

// create a new profile and needs as admin
router.post('/addProfile', function(req, res) {

  var newProfile = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    image: req.body.image,
    info: req.body.info    
  }
  var newNeed = {
    need: req.body.need,
    cost: req.body.cost,
  }

  db.profile.create(newProfile).then(function(profile) {
    profile.createNeed(newNeed).then(function(need) {
    req.flash('success', 'You added a profile.');
    res.redirect('/admin');
    });
  });
});

// edit profile
router.get('/editProfile/:id', function(req, res) {
  var id = req.params.id;

  db.profile.findOne({where: {id: id}}).then(function(profile) {
    res.render('editProfile', {profile: profile});
  });
});

router.put('/editProfile', function(req, res) {

  var id = req.body.id;

  var updatedProfile = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    image: req.body.image,
    info: req.body.info
  }

  // var updatedNeed = {
  //   need: req.body.need,
  //   cost: req.body.cost
  // }

  db.profile.find({where : {id : id}}).then(function(person){
    person.updateAttributes(updatedProfile)
    .then(function(){
      // db.need.update(updatedNeed, {where: {profileId: id}})
      req.flash('success', 'You edited a profile.');
      res.send(200)
    })

  });

});

// delete profile
router.delete('/editProfile', function(req, res) {
  var id = req.body.id;

  db.profile.destroy({where: {id: id}}).then(function() {
    db.need.destroy({where: {profileId: id}}).then(function() {
    req.flash('success', 'You deleted a profile.');
    res.status(200).send('Deleted User');
    });
  });
});
module.exports = router;