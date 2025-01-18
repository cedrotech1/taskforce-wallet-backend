import db from "../database/entity/index.js";
const Account = db["Account"];
const Transaction = db["Transaction"];
const User = db["User"];
const Budget = db["Budget"];
const Category = db["Category"];
const Subcategory = db["Subcategory"];


// Get all categories for a user   Subcategory
export const getAllCategories = async (userId) => {
  return await Category.findAll({
    where: { userId },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "firstname", "lastname", "email"],
      },
      {
        model: Subcategory,
        as: "subcategories",
        attributes: ["id", "name"],
      },

    ],
    order: [["createdAt", "DESC"]],
  });
};


// Get a single category by ID for a user
export const getCategoryByIdAndUserId = async (id, userId) => {
  return await Category.findOne({
    where: { id, userId },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "firstname", "lastname", "email"],
      },
      {
        model: Subcategory,
        as: "subcategories",
        attributes: ["id", "name"],
      },
    ],
  });
};

// Create a new category
export const createCategory = async (payload) => {
  return await Category.create(payload);
};

// Update a category
export const updateCategory = async (id, userId, payload) => {
  await Category.update(payload, { where: { id, userId } });
  return await getCategoryByIdAndUserId(id, userId); // Return updated category
};

// Delete a category
export const deleteCategory = async (id, userId) => {
  return await Category.destroy({ where: { id, userId } });
};
