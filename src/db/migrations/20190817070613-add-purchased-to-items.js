'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Items",
      "purchased",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Items", "purchased");
  }
};
