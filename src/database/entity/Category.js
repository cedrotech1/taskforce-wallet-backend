"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Category extends Model {
    static associate(models) {
      // A Category belongs to a User
      Category.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });

      // A Category can have many Subcategories
      Category.hasMany(models.Subcategory, {
        foreignKey: 'categoryId',
        as: 'subcategories',
      });

      // A Category can have many Transactions
  
    }
  }

  Category.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      name: {
        type: DataTypes.STRING,
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
      modelName: "Category",
      timestamps: true, // Automatically use createdAt and updatedAt
      freezeTableName: true,
    }
  );

  return Category;
};
