import db from "../database/entity/index.js";
const Account = db["Account"];
const Transaction = db["Transaction"];
const User = db["User"];
const Budget = db["Budget"];


// Get a budget by user ID with user details
export const getBudgetByUserId = async (userId) => {
  return await Budget.findOne({
    where: { userId },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "firstname", "lastname", "email"],
      },
    ],
  });
};

// Create a new budget
export const createBudget = async (payload) => {
  return await Budget.create(payload);
};

// Update an existing budget
export const updateBudget = async (userId, payload) => {
  await Budget.update(payload, { where: { userId } });
  return await getBudgetByUserId(userId); // Return the updated budget with user details
};
