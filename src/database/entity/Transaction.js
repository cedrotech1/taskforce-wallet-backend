"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Transaction extends Model {
    static associate(models) {
      // A Transaction belongs to an Account
      Transaction.belongsTo(models.Account, {
        foreignKey: 'accountId',
        as: 'account',
      });

      // A Transaction belongs to a User (through Account)
      Transaction.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });

      // A Transaction belongs to a Category
      Transaction.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category',
      });
    }
  }

  Transaction.init(
    {
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'account',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'category',
          key: 'id',
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Automatically set to current time
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Automatically set to current time
      },
    },
    {
      sequelize,
      timestamps: true, // Sequelize will automatically add 'createdAt' and 'updatedAt' fields
      modelName: 'Transaction',
      freezeTableName: true,
      
    }
  );

  return Transaction;
};
