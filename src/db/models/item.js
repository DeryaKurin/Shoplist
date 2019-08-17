'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    purchased: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsTo(models.List, {
      foreignKey: "listId",
      onDelete: "CASCADE"
    })
  };

  Item.prototype.hasPurchased = function() {
    return this.purchased === 1;
  }
  
  return Item;
};
