'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('needs', 'profileId', Sequelize.INTEGER);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('needs', 'profileId');
  }
};
