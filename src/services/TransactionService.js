import { where } from "sequelize";
import db from "../database/entity/index.js";
const Account = db["Account"];
const Transaction = db["Transaction"];
const User = db["User"];
const Budget = db["Budget"];
const Category = db["Category"];
const Subcategory = db["Subcategory"];



// Create a transaction and update account balance
export const createTransaction = async (data) => {
  const { accountId, amount, transactionType } = data;

  // Create the transaction
  const transaction = await Transaction.create(data);

  // Update the account balance based on the transaction type (expense or income)
  const account = await Account.findByPk(accountId);
  if (transactionType === "income") {
    account.balance += amount;  // Increase balance for income
  } else if (transactionType === "expense") {
    account.balance -= amount;  // Decrease balance for expense
  }

  // Save the updated account balance
  await account.save();

  return transaction;
};

// Get all transactions
export const getAllTransactions = async (userId) => {
  return await Transaction.findAll({
    where: { userId: userId },
    include: [
      {
        model: Account,
        as: "account",
      },
      {
        model: User,
        as: "user",
        attributes: ["id", "firstname", "lastname", "email"],
      },
      {
        model: Subcategory,
        as: "subcategory",
        include: [
          {
            model: Category,
            as: "category",
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

// Get a transaction by ID
export const getTransactionById = async (id, userId) => {
  return await Transaction.findOne({
    where: { id: id, userId: userId },
    include: [
      {
        model: Account,
        as: "account",
      },
      {
        model: User,
        as: "user",
        attributes: ["id", "firstname", "lastname", "email"],
        include: [
          {
            model: Budget,
            as: "Budget",
          },
        ],
      },
      {
        model: Subcategory,
        as: "subcategory",
        include: [
          {
            model: Category,
            as: "category",
          },
        ],
      },
    ],
  });
};



// Delete a transaction and update account balance
export const deleteTransaction = async (id) => {
  const transaction = await Transaction.findOne({ where: { id } });
  await Transaction.destroy({ where: { id } });

  return { success: true, message: "Transaction deleted successfully." };
};


export const transactionSummaryService = async (userId) => {
  if (!Number.isInteger(userId)) {
    throw new Error("Invalid user ID type. Must be an integer.");
  }

  const transactions = await Transaction.findAll({
    where: { userId }, // Ensure userId is an integer here
    include: [
      {
        model: Account,
        as: "account",
      },
      {
        model: User,
        as: "user",
        attributes: ["id", "firstname", "lastname", "email"],
        include: [
          {
            model: Budget,
            as: "Budget",
          },
        ],
      },
      {
        model: Subcategory,
        as: "subcategory",
        include: [
          {
            model: Category,
            as: "category",
          },
        ],
      },
    ],
  });

  const incomeTotal = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenseTotal = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    incomeTotal,
    expenseTotal,
    chartData: transactions.reduce(
      (acc, t) => {
        if (t.type === "income") acc.income += t.amount;
        if (t.type === "expense") acc.expense += t.amount;
        return acc;
      },
      { income: 0, expense: 0 }
    ),
  };
};
