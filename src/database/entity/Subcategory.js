"use strict";
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Subcategory extends Model {
    static associate(models) {
      // A Subcategory belongs to a Category
      Subcategory.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category',
      });

      Subcategory.hasMany(models.Transaction, {
        foreignKey: 'subcategoryId',
        as: 'transactions',
      });
    }
  }

  Subcategory.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'category',
          key: 'id',
        },
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
      modelName: "Subcategory",
      timestamps: true,
      freezeTableName: true,
    }
  );

  return Subcategory;
};
