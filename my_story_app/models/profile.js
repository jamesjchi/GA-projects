'use strict';
module.exports = function(sequelize, DataTypes) {
  var profile = sequelize.define('profile', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    image: DataTypes.STRING,
    info: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.profile.hasMany(models.need);
      }
    }
  });
  return profile;
};