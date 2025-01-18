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
      modelName: "Category",
      timestamps: true,
      freezeTableName: true,
    }
  );

  return Category;
};
