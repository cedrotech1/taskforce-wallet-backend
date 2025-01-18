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
      Transaction.belongsTo(models.Subcategory, {
        foreignKey: 'subcategoryId',
        as: 'subcategory',
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
      subcategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Subcategory',
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
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'Transaction',
      freezeTableName: true,
    }
  );
  return Transaction;
};
