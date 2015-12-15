'use strict';
module.exports = function(sequelize, DataTypes) {
  var profile = sequelize.define('profile', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.profile.hasMany(models.need);
      }
    }
  });
  return profile;
};

