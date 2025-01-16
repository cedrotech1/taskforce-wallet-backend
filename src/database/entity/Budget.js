"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Budget extends Model {
    static associate(models) {
      // A Budget belongs to a User
      Budget.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }

  Budget.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      limit: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      currentSpending: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: false,
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
      modelName: "Budget",
      timestamps: true,
      freezeTableName: true,
    }
  );

  return Budget;
};
