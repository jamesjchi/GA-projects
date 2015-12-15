'use strict';
module.exports = function(sequelize, DataTypes) {
  var need = sequelize.define('need', {
    need: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    totalFunds: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.need.belongsTo(models.profile);
      }
    }
  });
  return need;
};