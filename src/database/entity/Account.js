"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Account extends Model {
    static associate(models) {
      // An Account belongs to a User
      Account.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });


      // An Account can have many Transactions
      Account.hasMany(models.Transaction, {
        foreignKey: 'accountId',
        as: 'transactions',
      });
    }
  }

  Account.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      accountType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,  // Automatically set the creation time
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,  // Automatically set the updated time
      },
    },
    {
      sequelize,
      modelName: "Account",
      timestamps: true,  // Use Sequelize's auto-timestamping (createdAt, updatedAt)
      freezeTableName: true,
    }
  );

  return Account;
};
