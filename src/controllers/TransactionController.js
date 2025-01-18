import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  generateUserReportService,
  transactionSummaryService
} from "../services/TransactionService";

import {
  getAccountByUser,
  updateAccount,
  getAccountById
} from "../services/AccountsService";

import {
  getBudgetByUserId,
  updateBudget
} from "../services/BudgetService";
import {getUser} from "../services/userService";
import Email from "../utils/mailer";

// Create Transaction
export const addTransaction = async (req, res) => {
  try {
    const { accountId, subcategoryId, type, amount, description } = req.body;
    const userId = req.user.id;
    const user = await getUser(userId);
    const { id } = req.params;
    const account = await getAccountById(accountId);

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }
    if (account.userId != userId) {
      return res.status(404).json({
        success: false,
        message: "Account not yours",
      });
    }

    const budget = await getBudgetByUserId(userId);

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found for this user",
      });
    }

    let User_account = await getAccountByUser(accountId, userId);
    if (!User_account) {
      return res.status(400).json({
        success: false,
        message: "Account not found",
      });
    }
    let account_balance = User_account.balance;
    let account_id = User_account.id;
    let budget_limit = budget.limit;
    let currentSpending = budget.currentSpending;
    let updatedSpending;
    let message = 'Transaction created successfully';

    // Validate amount
    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Amount must be greater than zero." });
    }


    // Validate transaction type
    if (!["income", "expense"].includes(type.toLowerCase())) {
      return res
        .status(400)
        .json({ success: false, message: "Type must be 'income' or 'expense'." });
    }
    let balance

    if (type.toLowerCase() === "expense") {
      if (account_balance < amount) {
        return res.status(400).json({
          success: false,
          message: "Expense exceeds the available account balance.",
        });
      }
      else {
        balance = account_balance - amount;
        updatedSpending = currentSpending + amount;
        if (budget_limit < updatedSpending) {
          message = "Transaction created successfully but you exceed bugget limit"
          console.log("now you exceed your bugdet limit!");
          console.log(user)
          await new Email(user).sendNotification();
        }
      }
    } else {
      balance = account_balance + amount;
    }
    const transaction = await createTransaction({
      accountId,
      userId,
      subcategoryId,
      type,
      amount,
      description,
    });

    const updatedAccount = await updateAccount(account_id, { balance: balance });
    const updatedBudget = await updateBudget(userId, { currentSpending: updatedSpending });


    res.status(201).json({
      success: true,
      message: message,
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get All Transactions
export const Transactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await getAllTransactions(userId);

    // Initialize summary variables
    let totalExpense = 0;
    let totalIncome = 0;
    const summaryByCategory = {};
    const summaryBySubcategory = {};

    // Calculate summaries
    transactions.forEach((transaction) => {
      const { type, amount, subcategory } = transaction;
      const categoryName = subcategory?.category?.name || "Uncategorized";
      const subcategoryName = subcategory?.name || "Uncategorized";

      // Update total income or expense
      if (type === "expense") totalExpense += amount;
      if (type === "income") totalIncome += amount;

      // Update category summary
      if (!summaryByCategory[categoryName]) {
        summaryByCategory[categoryName] = { totalExpense: 0, totalIncome: 0 };
      }
      summaryByCategory[categoryName][type === "expense" ? "totalExpense" : "totalIncome"] += amount;

      // Update subcategory summary
      if (!summaryBySubcategory[subcategoryName]) {
        summaryBySubcategory[subcategoryName] = { totalExpense: 0, totalIncome: 0 };
      }
      summaryBySubcategory[subcategoryName][type === "expense" ? "totalExpense" : "totalIncome"] += amount;
    });

    // Response with transactions and summaries
    res.status(200).json({
      success: true,
      message: "Transactions retrieved successfully",
      data: transactions,
      summary: {
        totalExpense,
        totalIncome,
        balance: totalIncome - totalExpense,
        summaryByCategory,
        summaryBySubcategory,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



export const generateTransactionUserReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const userId = req.user.id; // Extract user ID from the logged-in user context

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide both startDate and endDate in the query parameters.",
      });
    }

    // Fetch all transactions for the user
    const allTransactions = await getAllTransactions(userId);

    // Filter transactions by date range
    const transactions = allTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.createdAt);
      return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate);
    });

    // Initialize summary variables
    let totalExpense = 0;
    let totalIncome = 0;

    // Calculate summaries
    transactions.forEach((transaction) => {
      const { type, amount } = transaction;

      // Update total income or expense
      if (type === "expense") totalExpense += amount;
      if (type === "income") totalIncome += amount;
    });

    // Response with filtered transactions and summaries
    res.status(200).json({
      success: true,
      message: "Transactions retrieved successfully",
      data: transactions,
      summary: {
        totalExpense,
        totalIncome,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Get All Transactions
export const getTransactionSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await getAllTransactions(userId);

    // Initialize summary variables
    let totalExpense = 0;
    let totalIncome = 0;
    let totalTransactions = transactions.length;
    let incomeTransactions = 0;
    let expenseTransactions = 0;

    // Calculate income and expense statistics
    transactions.forEach((transaction) => {
      const { type, amount } = transaction;

      if (type === "expense") {
        totalExpense += amount;
        expenseTransactions++;
      } else if (type === "income") {
        totalIncome += amount;
        incomeTransactions++;
      }
    });

    // Calculate percentages
    const expensePercentage = totalTransactions > 0 ? ((expenseTransactions / totalTransactions) * 100).toFixed(2) : 0;
    const incomePercentage = totalTransactions > 0 ? ((incomeTransactions / totalTransactions) * 100).toFixed(2) : 0;

    // Response with statistics
    res.status(200).json({
      success: true,
      message: "Transactions statistics retrieved successfully",
      summary: {
        totalIncome,
        totalExpense,
        totalTransactions,
        incomeTransactions,
        expenseTransactions,
        incomePercentage: `${incomePercentage}%`,
        expensePercentage: `${expensePercentage}%`,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Get Transaction by ID
export const TransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const transaction = await getTransactionById(id, userId);

    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found." });
    }

    res.status(200).json({
      success: true,
      message: "Transaction retrieved successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete Transaction
export const removeTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const transaction = await getTransactionById(id, userId);

    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found." });
    }
    // console.log(transaction);
    let transaction_amount = transaction.amount;
    let transaction_type = transaction.type;
    let account_id = transaction.account.id;
    let account_balance = transaction.account.balance;
    let budget_limit = transaction.user.Budget.currentSpending;
    let currentSpending = transaction.user.Budget.currentSpending;
    let updatedSpending;
    let account_balance_toupdate = 0;
    let budget_limit_to_update = 0;
    let currentSpending_toupdate = 0;

    if (transaction_type.toLowerCase() === "expense") {
      account_balance_toupdate = account_balance + transaction_amount;
      currentSpending_toupdate = currentSpending - transaction_amount
    } else {
      account_balance_toupdate = account_balance - transaction_amount;
    }


    const updatedAccount = await updateAccount(account_id, { balance: account_balance_toupdate });
    const updatedBudget = await updateBudget(userId, { currentSpending: currentSpending_toupdate });

    const rows = await deleteTransaction(id);

    if (!rows) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found." });
    }

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
