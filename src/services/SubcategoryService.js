import db from "../database/entity/index.js";
const Account = db["Account"];
const Transaction = db["Transaction"];
const User = db["User"];
const Budget = db["Budget"];
const Category = db["Category"];
const Subcategory = db["Subcategory"];


// Create a subcategory
export const createSubcategory = async (data) => {
  return await Subcategory.create(data);
};

// Get all subcategories
export const getAllSubcategories = async () => {
  return await Subcategory.findAll({
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name"],
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "firstname", "lastname", "email"],
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

// Get a subcategory by ID
export const getSubcategoryById = async (id) => {
  return await Subcategory.findOne({
    where: { id },
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name"],
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "firstname", "lastname", "email"],
          },
        ],
      },
    ],
  });
};

// Update a subcategory
export const updateSubcategory = async (id, data) => {
  return await Subcategory.update(data, { where: { id }, returning: true });
};

// Delete a subcategory
export const deleteSubcategory = async (id) => {
  return await Subcategory.destroy({ where: { id } });
};
